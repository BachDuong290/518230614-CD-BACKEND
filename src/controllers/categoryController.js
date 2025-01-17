import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";

export async function listCategory(req, res){
    try {
        const categories = await CategoryModel.find();
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
    const {id} = req.params;
    const category = await CategoryModel.findOne({_id: new ObjectId(id)})
    if (category){
        res.render("pages/categories/form", {
            title: "Update Catogories",
            mode: "Update",
            category: category
        })
    }else{
        res.send("There are currently no matching products!")
    }
}

export async function updateCategory(req, res){
    const {code, name, image, id} = req.body;
    try {
        await CategoryModel.updateOne(
            {  _id: new ObjectId(id) },
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
