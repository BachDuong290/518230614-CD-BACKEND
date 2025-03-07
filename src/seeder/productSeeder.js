import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";

const data = [
    {
        code: "MN_001",
        name: "LOreal Mask",
        price: 430.000,
        images: ["product6.png"],
        search: "mask, moisturizing mask",
        capacity: ["1 piece"],
        size: ["S", "M", "L"],
        color: ["#FFCCFF","#FF9999", "#FF66CC"],
        active: true,
        description: "LOreal Paris mask is a solution to help the skin relax after a day of exposure to the outside environment.",
        information: "LOreal is present in more than 120 countries with many factories with strict processes. Bringing diverse and quality beauty solutions and becoming the name that many consumers choose.",
        categoryCode: "CSD_001",
        createAt: new Date(),
    },
    {
        code: "DG_001",
        name: "LOreal Shampoo",
        price: 295.000,
        images: ["product7.png"],
        search: "Shampoo, Super smooth shampoo",
        capacity: ["150ml", "250ml", "550ml"],
        size: ["S", "M", "L"],
        color: ["#FFCC66","#FFFF00", "#FFFF99"],
        active: true,
        description: "Loreal Paris Extraordinary Oil Smooth Silicone-Free Shampoo contains natural ingredients such as 100% cedarwood extract",
        information: "Your hair represents your happiness and health. Your hair is also considered one of the first things that people notice about you.",
        categoryCode: "CST_001",
        createAt: new Date(),
    },
    {
        code: "SM_001",
        name: "LOreal Lipstick",
        price: 250.000,
        images: ["product12.png"],
        search: "LOreal Lipstick, lipstick",
        capacity: ["Other"],
        size: ["S", "M", "L"],
        color: ["#FF3366","#FF3300", "#FF3333"],
        active: true,
        description: "LOreal Color Riche Moisture Matte Lipstick not only brings you the most fashionable colors, but also the ability to keep lip color long-lasting along with the ability to moisturize and protect lips wonderfully from precious essential oils has proven that this is the lipstick that should be in any woman's handbag.",
        information: "LOreal Paris has brought to women the LOreal Color Riche Moisture Matte collection extracted from precious Jojoba essential oil, which has excellent moisturizing effects and helps keep lips soft and attractive. ",
        categoryCode: "TVS_001",
        createAt: new Date(),
    },
    {
        code: "CKD_001",
        name: "LOreal Concealer",
        price: 172.000,
        images: ["product14.png"],
        search: "LOreal Concealer",
        capacity: ["Other"],
        size: ["S", "M", "L"],
        color: ["#FFCC99","#FFCCCC", "#FFEBCD"],
        active: true,
        description: "LOreal Infallible Full Wear More Than Concealer 10ml from the famous brand L'Oréal Paris will help correct skin tone, along with the large brush head, the product will cover all flaws while hiding the fatigue and dullness on your skin.",
        information: "LOreal Infallible Full Wear More Than Concealer 10ml with magical effects helps you cover skin imperfections such as red acne, dark circles, dark spots, pockmarks, even small scars, concealer helps women always be confident because of their skin.",
        categoryCode: "TĐ_001",
        createAt: new Date(),
    },
]
export default async function categorySeeder() {
    await ProductModel.deleteMany()
    const categories = await CategoryModel.find()
    let writeProduct = []
    for(let product in data){
        const {categoryCode, ...dataOther} = data[product]
        const category = categories.find(categoriesItem => {
            return categoriesItem.code === categoryCode
        })
        writeProduct.push({
            categoryId: !!category ? category._id : null,
            ...dataOther
        })
    }
    await ProductModel.insertMany(writeProduct)
}