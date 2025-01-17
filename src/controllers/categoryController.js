import CategoryModel from "../models/categoryModel.js";

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
    res.render("pages/categories/createCategory", {
        title: "Create Catogories",
        // categories: categories,
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

