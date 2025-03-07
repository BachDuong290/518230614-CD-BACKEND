import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";
import { removeVietnameseAccents } from "../common/index.js";
import { ObjectId } from "mongodb";

const sortObjects = [
    {code: "name_ASC", name: "Ascending name" }, 
    {code: "name_DESC", name: "Descending name" },
    {code: "code_ASC", name: "Ascending code"},
    {code: "code_DESC", name: "Descending code"},
]

const sizes = ["S", "M", "L", "XL"]
const capacitys = ["150ml", "250ml", "550ml", "1 piece", "Other"]
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
 
    try {
        const countProducts = await ProductModel.countDocuments(filters)
        const products  = await ProductModel.find(filters).populate("category").skip(skip).limit(pageSize).sort(sort)
        res.render("pages/products/listProduct", { 
            title: "Products",
            products: products, 
            capacitys:capacitys,
            countPagination: Math.ceil(countProducts / pageSize),
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
    console.log("capacitys:", capacitys); // Kiểm tra xem biến có tồn tại không
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
    console.log("capacity:", capacitys);
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
                capacitys: capacitys,
                sizes: sizes,
                colors: colors,
                categories: categories,
                err: {}
            })
        }else{
            res.send("Website does not exist!")
        }
    } catch (error) {
        res.send("!")
    }
}

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { ...data } = req.body;
        console.log("Received data:", data);

        // Lấy danh mục sản phẩm

        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await ProductModel.findById(id);
        console.log("Existing product:", product);

        if (!product) {
            return res.status(404).send("Product not found!");
        }

        // Kiểm tra xem code có bị trùng không (nếu cần)
        const existingProduct = await ProductModel.findOne({ code: data.code, _id: { $ne: id } });
        if (existingProduct) {
            throw "code"; // Đánh dấu lỗi code trùng
        }

        // Cập nhật sản phẩm
        await ProductModel.updateOne(
            { _id: id },
            {
                ...data,
                updatedAt: new Date()
            }
        );

        console.log("Product updated successfully!");
        res.redirect("/products");
    } catch (error) {
        console.error("Update error:", error);
        const categories = await CategoryModel.find({ deletedAt: null });
        let err = {};
        if (error === "code") {
            err.code = "Product code already exists!";
        } else if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
        }

        res.render("pages/products/form", {
            title: "Update Products",
            mode: "Update",
            product: { ...data, id: id },
            capacitys: capacitys,
            colors: colors,
            categories: categories,
            err
        });
    }
}

export async function renderPageDeleteProduct(req, res) {
    try {
        const { id } = req.params;

        // Lấy danh sách danh mục
        const categories = await CategoryModel.find();

        // Tìm sản phẩm theo ID
        const product = await ProductModel.findOne({ _id: id, deletedAt: null });

        if (!product) {
            return res.send("There are currently no matching products!");
        }

        // Đảm bảo biến capacitys, sizes, colors có giá tr

        res.render("pages/products/form", {
            title: "Delete Products",
            mode: "Delete",
            product: { 
                ...product.toObject(), 
                capacity: product.capacity || [], 
                colors: product.colors || [], 
                sizes: product.sizes || []
            },
            capacitys: capacitys,
            sizes: sizes,
            colors: colors,
            categories: categories,
            err: {}
        });
    } catch (error) {
        console.error("Error:", error);
        res.send("Website does not exist!");
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.body;
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(
            id,
            { deletedAt: new Date() }, // Đánh dấu là đã xóa (soft delete)
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).send("Product not found!");
        }

        res.redirect("/products");
    } catch (error) {
        console.error(error);
        res.status(500).send("Delete product failed!");
    }
}

