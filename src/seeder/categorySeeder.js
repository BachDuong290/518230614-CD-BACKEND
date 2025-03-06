import CategoryModel from "../models/categoryModel.js";

const data = [
    {
        code: "CSD_001",
        name: "Chăm Sóc Da",
        image: "cart1.png",
        search: "cham soc da",
        createAt: new Date(),
    },
    {
        code: "TVS_001",
        name: "Tư Vấn Son",
        image: "cart2.png",
        search: "tu van son, son",
        createAt: new Date(),
    },
    {
        code: "TĐ_001",
        name: "Trang Điểm",
        image: "cart3.png",
        search: "trang diem",
        createAt: new Date(),
    },
    {
        code: "CST_001",
        name: "Chăm Sóc Tóc",
        image: "cart4.png",
        search: "cham soc toc",
        createAt: new Date(),
    }
]
export default async function categorySeeder() {
    await CategoryModel.deleteMany()
    await CategoryModel.insertMany(data)
}