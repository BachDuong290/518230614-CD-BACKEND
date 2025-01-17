import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";

export async function listCategory(req, res){
    try {
        const categories = await CategoryModel.find({ deletedAt: null });
        res.render("pages/categories/listCategory", {
            title: "Catogories",
            categories: categories,
        })
    } catch (error) {
        console.log(error)
        res.send("No products available!");
    }
}

export async function renderPageCreateCategory(req, res){
    res.render("pages/categories/form", {
        title: "Create Catogories",
        mode: "Create",
        category: {}
    })
}

export async function createCategory(req, res){
    const {code, name, image} = req.body;
    try {
        await CategoryModel.create({
            code, name, image, createdAt: new Date()
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
                title: "Update Catogories",
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
    const {code, name, image, id} = req.body;
    try {
        await CategoryModel.updateOne(
            {  _id: new ObjectId(id), deletedAt: null },
            {
                code,
                name,
                image,
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
            title: "Delete Catogories",
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
