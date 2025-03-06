import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import { removeVietnameseAccents } from "../common/index.js";
import { ObjectId } from "mongodb";

const sortObjects = [
    {code: "name_ASC", name: "Tên tăng dần" }, 
    {code: "name_DESC", name: "Tên giảm dần" },
    {code: "code_ASC", name: "Mã tăng dần"},
    {code: "code_DESC", name: "Mã giảm dần"},
]

const sizes = ["S", "M", "L", "XL"]
const capacitys = ["150ml", "250ml", "550ml", "1 miếng", "Khác"]
const colors = ["black", "pink", "yellow", "red"]

export async function listProduct(req, res){
    const search = req.query?.search
    const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5 // mđ 5 cái
    const page = !!req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * pageSize
    let sort = !!req.query.sort ? req.query.sort : null

    let filters = {
        deletedAt: null
    }
    if (search && search.length > 0){
        filters.search = {$regex: removeVietnameseAccents(search), $options: "i"}
    }
    if(!sort){
        sort = {createdAt: -1}
    } else{
        const sortArray = sort.split('_')
        sort = { [sortArray[0]] : sortArray[1] === "ASC" ? 1 : -1}
    }
    try {
        const countProducts = await ProductModel.countDocuments(filters)
        const products  = await ProductModel.find(filters).populate("category").skip(skip).limit(pageSize).sort(sort)
        res.render("pages/products/listProduct", {
            title: "Products",
            products: products,
            countPagination: Math.ceil(countProducts/pageSize),
            pageSize,
            page,
            sort: req.query.sort || "createdAt_DESC",
            sortObjects
        })
    } catch (error) {
        console.log(error)
        res.send("No products available!");
    }
}

export async function renderPageCreateProduct(req, res){
    const categories = await CategoryModel.find({deletedAt: null})
    res.render("pages/products/form", {
        title: "Create Products",
        mode: "Create",
        product: {capacitys: [], colors: [], sizes: []},
        sizes: sizes,
        capacitys: capacitys,
        colors: colors,
        categories: categories,
        err: {}
    })
}

export async function createProduct(req, res){
    const categories = await ProductModel.find({deletedAt: null})
    const {sizes: productSize, colors: productColor, capacity: productCapacity, image, ...dataOther} = req.body;
    console.log("req.body", req.body)
    let sizeArray = [], colorArray = [], capacityArray = [], imageArray = [image] 
    if (typeof productSize === "string" ){
        sizeArray = [productSize];
    }
    if (typeof productSize === "object" ){
        sizeArray = productSize;
    }
    if (typeof productColor === "string" ){
        colorArray = [productColor];
    }
    if (typeof productColor === "object" ){
        colorArray = productColor;
    }
    if (typeof productCapacity === "string") {
        capacityArray = [productCapacity];
    }
    if (typeof productCapacity === "object") {
        capacityArray = productCapacity;
    }

    try {
        const product = await ProductModel.findOne({code: dataOther.code, deletedAt: null})
        if(product){
            throw("code")
        }
        await ProductModel.create({
            sizes: sizeArray,
            colors: colorArray,
            images: imageArray,
            capacity: capacityArray,
            ...dataOther, createdAt: new Date()
        })
        res.redirect("/products")
    } catch (error) {
        console.log("error", error);
        let err = {};
        if(error === "code"){
            err.code = "Product code already exists!"
        }
        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
        }
        console.log("err", err);

        res.render("pages/products/form", {
            title: "Create Products",
            mode: "Create",
            product: {sizes: sizeArray, colors: colorArray, capacity: productCapacity, image, ...dataOther},
            sizes: sizes,
            colors: colors,
            categories: categories,
            capacitys: capacitys,
            err
        })
    }
}

export async function renderPageUpdateProduct(req, res){
    console.log("Sizes:", sizes);
    try {
    const categories = await CategoryModel.find({deletedAt: null})
        const {id} = req.params;
        const product = await ProductModel.findOne({_id: new ObjectId(id), deletedAt: null})
        if (product){
            console.log("product", product, categories)
            res.render("pages/products/form", {
                title: "Update Products",
                mode: "Update",
                product: { 
                    ...product.toObject(), 
                    capacity: product.capacity || [], 
                    colors: product.colors || [], 
                    sizes: product.sizes || []
                },
                sizes: sizes,
                colors: colors,
                categories: categories,
                capacitys: capacitys,
                err: {}
            })
        }else{
            res.send("Website does not exist!")
        }
    } catch (error) {
        res.send("!")
    }
}

export async function updateProduct(req, res){
    const {...data} = req.body;
    const {id} = req.params;
    console.log("data:", data)
    try {
        const product= await ProductModel.findOne({code: data.code, deletedAt: null})
        if(product){
            throw("code")
        }
        await ProductModel.updateOne(
            {  _id: new ObjectId(id), deletedAt: null },
            {
                ...data,
                updatedAt: new Date()
            })
            res.redirect("/products")
    } catch (error) {
        console.log(error)
        console.log("error", error);
        let err = {};
        if(error === "code"){
            err.code = "Product code already exists!"
        }
        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
        }
        console.log("err", err);

        res.render("pages/products/form", {
            title: "Update Products",
            mode: "Update",
            product: {...data, id: id},
            err
        })
    }
}

export async function renderPageDeleteProduct(req, res){
    try {
        const {id} = req.params;
        const category = await ProductModel.findOne({_id: new ObjectId(id), deletedAt: null})
    if (category){
        res.render("pages/categories/form", {
            title: "Delete Categories",
            mode: "Delete",
            category: category,
            err: {}
        })
    }else{
        res.send("There are currently no matching products!")
    }
    } catch (error) {
        console.log(error)
        res.send("Website does not exist!")
    }
}

export async function deleteProduct(req, res){
    const {id} = req.body;
    try {
        await ProductModel.updateOne(
            {  _id: new ObjectId(id) },
            {
                deletedAt: new Date()
            })
            res.redirect("/products")
    } catch (error) {
        console.log(error)
        res.send("Delete product failed!");
    }
}

