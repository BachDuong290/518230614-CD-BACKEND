import CategoryModel from "../models/categoryModel.js";
import { removeVietnameseAccents } from "../common/index.js";
import { ObjectId } from "mongodb";

export async function listCategory(req, res){
    const search = req.query?.search
    const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5 // mđ 5 cái
    const page = !!req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * pageSize
    console.log ({pageSize, skip})

    // 11 category
    // 0- 4 -> 5 
    // page 1: skip 0
    // page 2: skip 5
    // page - 1 * pageSize

    let filters = {
        deletedAt: null
    }
    if (search && search.length > 0){
        filters.search = {$regex: removeVietnameseAccents(search), $options: "i"}
    }
    try {
        const countCategories = await CategoryModel.countDocuments(filters)
        const categories = await CategoryModel.find(filters).skip(skip).limit(pageSize);
        // res.json(categories)
        console.log({page})
        res.render("pages/categories/listCategory", {
            title: "Categories",
            categories: categories,
            countPagination: Math.ceil(countCategories/pageSize),
            pageSize,
            page,
        })
    } catch (error) {
        console.log(error)
        res.send("No products available!");
    }
}

export async function renderPageCreateCategory(req, res){
    res.render("pages/categories/form", {
        title: "Create Categories",
        mode: "Create",
        category: {}
    })
}

export async function createCategory(req, res){
    const data = req.body;
    try {
        await CategoryModel.create({
            ...data, createdAt: new Date()
        })
        res.redirect("/categories")
    } catch (error) {
        console.log(error)
        res.send("Create category failed!");
    }
}

export async function renderPageUpdateCategory(req, res){
    try {
        const {id} = req.params;
        const category = await CategoryModel.findOne({_id: new ObjectId(id), deletedAt: null})
        if (category){
            res.render("pages/categories/form", {
                title: "Update Categories",
                mode: "Update",
                category: category
            })
        }else{
            res.send("Website does not exist!")
        }
    } catch (error) {
        res.send("!")
    }
}

export async function updateCategory(req, res){
    const {id, ...data} = req.body;
    try {
        await CategoryModel.updateOne(
            {  _id: new ObjectId(id), deletedAt: null },
            {
                ...data,
                updatedAt: new Date()
            })
            res.redirect("/categories")
    } catch (error) {
        console.log(error)
        res.send("Update category failed!");
    }
}

export async function renderPageDeleteCategory(req, res){
    try {
        const {id} = req.params;
        const category = await CategoryModel.findOne({_id: new ObjectId(id), deletedAt: null})
    if (category){
        res.render("pages/categories/form", {
            title: "Delete Categories",
            mode: "Delete",
            category: category
        })
    }else{
        res.send("There are currently no matching products!")
    }
    } catch (error) {
        console.log(error)
        res.send("Website does not exist!")
    }
}

export async function deleteCategory(req, res){
    const {id} = req.body;
    try {
        await CategoryModel.updateOne(
            {  _id: new ObjectId(id) },
            {
                deletedAt: new Date()
            })
            res.redirect("/categories")
    } catch (error) {
        console.log(error)
        res.send("Delete category failed!");
    }
}
