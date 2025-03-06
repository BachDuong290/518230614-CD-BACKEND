import OrderModel from "../models/orderModel.js";
import { ObjectId } from "mongodb";

export async function listOrder(req, res){
    const search = req.query?.search
    const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5 // mđ 5 cái
    const page = !!req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * pageSize
    let sort = !!req.query.sort ? req.query.sort : null

    // 11 category
    // 0- 4 -> 5 
    // page 1: skip 0
    // page 2: skip 5
    // page - 1 * pageSize

    let filters = {
        deletedAt: null
    }
    if (search && search.length > 0){
        filters.orderNo = search
    }
    if(!sort){
        sort = {createdAt: -1}
    } else{
        const sortArray = sort.split('_')
        sort = { [sortArray[0]] : sortArray[1] === "ASC" ? 1 : -1}
    }
    try {
        const countOrders = await OrderModel.countDocuments(filters)
        const orders  = await OrderModel.find(filters).skip(skip).limit(pageSize).sort(sort)
        // res.render("pages/categories/listCategory", {
        //     title: "Categories",
        //     categories: categories,
        //     countPagination: Math.ceil(countCategories/pageSize),
        //     pageSize,
        //     page,
        //     sort: req.query.sort || "createdAt_DESC",
        //     sortObjects
        // })
        res.send({ countOrders, orders})
    } catch (error) {
        console.log(error)
        res.send("No products available!");
    }
}

// export async function renderPageCreateCategory(req, res){
//     res.render("pages/categories/form", {
//         title: "Create Categories",
//         mode: "Create",
//         category: {},
//         err: {}
//     })
// }

export async function createOrder(req, res){
    const { discount, status, orderItems} = req.body;
    let subTotal = 0, total = 0, numbericalOrder = 1

    const lastOrder = await OrderModel.findOne().sort({ createdAt: -1 })
    if(lastOrder){
        numbericalOrder = lastOrder.numbericalOrder + 1
    }

    const orderNo = "order-" + numbericalOrder

    if(orderItems.length > 0){
        for(let orderItem of orderItems){
            subTotal += orderItem.quantity * orderItem.price
        }
    }
    total = subTotal * (100 - discount) / 100

    try {
        const rs = await OrderModel.create({
            orderNo: orderNo, 
            discount: discount, 
            total: total, 
            status: status, 
            orderItems: orderItems,
            numbericalOrder: numbericalOrder,
            createdAt: new Date()
        })
        res.send(rs)
    } catch (error) {
        console.log("error", error);
    }
}

// export async function renderPageUpdateCategory(req, res){
//     try {
//         const {id} = req.params;
//         const category = await CategoryModel.findOne({_id: new ObjectId(id), deletedAt: null})
//         if (category){
//             res.render("pages/categories/form", {
//                 title: "Update Categories",
//                 mode: "Update",
//                 category: category, 
//                 err: {}
//             })
//         }else{
//             res.send("Website does not exist!")
//         }
//     } catch (error) {
//         res.send("!")
//     }
// }

// export async function updateCategory(req, res){
//     const {...data} = req.body;
//     const {id} = req.params;
//     try {
//         const category = await CategoryModel.findOne({code: data.code, deletedAt: null})
//         if(category){
//             throw("code")
//         }
//         await CategoryModel.updateOne(
//             {  _id: new ObjectId(id), deletedAt: null },
//             {
//                 ...data,
//                 updatedAt: new Date()
//             })
//             res.redirect("/categories")
//     } catch (error) {
//         console.log(error)
//         console.log("error", error);
//         let err = {};
//         if(error === "code"){
//             err.code = "Product code already exists!"
//         }
//         if(error.name === "ValidationError"){
//             Object.keys(error.errors).forEach(key => {
//                 err[key] = error.errors[key].message;
//             });
//         }
//         console.log("err", err);

//         res.render("pages/categories/form", {
//             title: "Update Categories",
//             mode: "Update",
//             category: {...data, id: id},
//             err
//         })
//     }
// }

// export async function renderPageDeleteCategory(req, res){
//     try {
//         const {id} = req.params;
//         const category = await CategoryModel.findOne({_id: new ObjectId(id), deletedAt: null})
//     if (category){
//         res.render("pages/categories/form", {
//             title: "Delete Categories",
//             mode: "Delete",
//             category: category,
//             err: {}
//         })
//     }else{
//         res.send("There are currently no matching products!")
//     }
//     } catch (error) {
//         console.log(error)
//         res.send("Website does not exist!")
//     }
// }

// export async function deleteCategory(req, res){
//     const {id} = req.body;
//     try {
//         await CategoryModel.updateOne(
//             {  _id: new ObjectId(id) },
//             {
//                 deletedAt: new Date()
//             })
//             res.redirect("/categories")
//     } catch (error) {
//         console.log(error)
//         res.send("Delete category failed!");
//     }
// }
