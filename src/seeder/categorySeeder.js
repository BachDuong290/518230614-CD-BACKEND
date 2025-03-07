import CategoryModel from "../models/categoryModel.js";

const data = [
    {
        code: "CSD_001",
        name: "Skin Care",
        image: "cart1.png",
        search: "Skin Care",
        createAt: new Date(),
    },
    {
        code: "TVS_001",
        name: "Consulting Son",
        image: "cart2.png",
        search: "Consulting Son son",
        createAt: new Date(),
    },
    {
        code: "TĐ_001",
        name: "Makeup",
        image: "cart3.png",
        search: "Makeup",
        createAt: new Date(),
    },
    {
        code: "CST_001",
        name: "Hair Care",
        image: "cart4.png",
        search: "Hair Care",
        createAt: new Date(),
    }
]
export default async function categorySeeder() {
    await CategoryModel.deleteMany()
    await CategoryModel.insertMany(data)
}