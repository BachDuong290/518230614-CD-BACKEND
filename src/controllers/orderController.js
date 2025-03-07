import OrderModel from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";
import { ObjectId } from "mongodb";

const sortObjects = [
    {code: "name_ASC", name: "Ascending name" }, 
    {code: "name_DESC", name: "Descending name" },
    {code: "code_ASC", name: "Ascending code"},
    {code: "code_DESC", name: "Descending code"},
]
const sizes = ["S", "M", "L", "XL"]
const capacitys = ["150ml", "250ml", "550ml", "1 piecpiece ", "Other"]
const colors = ["black", "pink", "yellow", "red"]

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
        const orders  = await OrderModel.find(filters).populate("orderItems.product", "name code").skip(skip).limit(pageSize).sort(sort)
        // res.send(orders)
        res.render("pages/orders/listOrder", {
            title: "Order",
            orders: orders,
            countPagination: Math.ceil(countOrders/pageSize),
            pageSize,
            page,
            sort: req.query.sort || "createdAt_DESC",
            sortObjects,
        })
        // res.send({ countOrders, orders})
    } catch (error) {
        console.log(error)
        res.send("No products available!");
    }
}

export async function renderPageSimulateCreateOrder(req, res){
    const products  = await ProductModel.find({deletedAt: null}, "code name price capacity colors")
    res.render("pages/orders/form", {
        title: "Create Orders",
        mode: "Create",
        order: {},
        products: products, 
        err: {},
    })
}

export async function createOrder(req, res){
    const { discount, orderItems, bllingAddress} = req.body;
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
            status: "created", 
            orderItems: orderItems,
            numbericalOrder: numbericalOrder,
            bllingAddress: bllingAddress,
            createdAt: new Date()
        })
        res.send(rs)
    } catch (error) {
        console.log("error", error);
    }
}

const validColors = ["black", "pink", "yellow", "red"];
const defaultCapacity = "250ml";

export async function simulatorCreateOrder(req, res) {
    const { discount, itemSelect, quantity, itemPrice, itemColor, itemCapacity,
        bllingName, bllingEmail, bllingPhoneNumber, bllingAddress: address,
        bllingDistrict, bllingCity } = req.body;

    let subTotal = 0, total = 0, numbericalOrder = 1;

    const lastOrder = await OrderModel.findOne().sort({ createdAt: -1 });
    if (lastOrder) {
        numbericalOrder = lastOrder.numbericalOrder + 1;
    }

    const orderNo = "order-" + numbericalOrder;

    const bllingAddress = {
        name: bllingName,
        email: bllingEmail,
        phoneNumber: bllingPhoneNumber,
        address: address,
        district: bllingDistrict,
        city: bllingCity
    };

    // Chuyển đổi dữ liệu thành mảng nếu chưa phải mảng
    const itemSelectArr = Array.isArray(itemSelect) ? itemSelect : [itemSelect];
    const quantityArr = Array.isArray(quantity) ? quantity : [quantity];
    const itemPriceArr = Array.isArray(itemPrice) ? itemPrice : [itemPrice];
    const itemColorArr = Array.isArray(itemColor) ? itemColor : [itemColor];
    const itemCapacityArr = Array.isArray(itemCapacity) ? itemCapacity : [itemCapacity];

    // Tạo danh sách orderItems
    const orderItems = [];

    for (let i = 0; i < itemSelectArr.length; i++) {
        const selectedColor = validColors.includes(itemColorArr[i]) ? itemColorArr[i] : "black"; // Màu mặc định hợp lệ
        orderItems.push({
            productId: new ObjectId(itemSelectArr[i]), 
            quantity: parseInt(quantityArr[i]) || 1,
            price: parseFloat(itemPriceArr[i]) || 0,
            color: selectedColor, 
            capacity: itemCapacityArr[i] || defaultCapacity 
        });
    }

    // Tính toán tổng tiền
    if (orderItems.length > 0) {
        for (let orderItem of orderItems) {
            subTotal += orderItem.quantity * orderItem.price;
        }
    }

    const discountValue = parseFloat(discount) || 0;
    total = subTotal * (100 - discountValue) / 100;

    try {
        const rs = await OrderModel.create({
            orderNo: orderNo,
            discount: discountValue,
            total: total,
            status: "created",
            orderItems: orderItems,
            numbericalOrder: numbericalOrder,
            bllingAddress: bllingAddress,
            createdAt: new Date()
        });

        res.redirect("/orders");
    } catch (error) {
        console.log("error", error);
    }
}

export async function updateStatusDeliveringOrder(req, res) {
    const { orderId} = req.body;

    const currentOrder = await OrderModel.findOne({_id: new ObjectId(orderId)},)

    try {
        console.log(rs)
        if(currentOrder){
            const rs = await OrderModel.updateOne({_id: new ObjectId(orderId)},
        {
            status: "delivering",
            updatedAt: new Date()
        });
        res.send({success: true, });
        }else{
            res.send({
                success: true,
                message: "This order does not exist!"
            })
        }
    } catch (error) {
        res.send({
            success: true,
            message: "Change status failed!" + currentOrder.orderNo
        });
        console.log("error", error);
    }
}



// export async function renderPageUpdateProduct(req, res){
//     console.log("Sizes:", sizes);
//     try {
//     const categories = await CategoryModel.find({deletedAt: null})
//         const {id} = req.params;
//         const product = await ProductModel.findOne({_id: new ObjectId(id), deletedAt: null})
//         if (product){
//             console.log("product", product, categories)
//             res.render("pages/products/form", {
//                 title: "Update Products",
//                 mode: "Update",
//                 product: { 
//                     ...product.toObject(), 
//                     capacity: product.capacity || [], 
//                     colors: product.colors || [], 
//                     sizes: product.sizes || []
//                 },
//                 sizes: sizes,
//                 colors: colors,
//                 categories: categories,
//                 capacitys: capacitys,
//                 err: {}
//             })
//         }else{
//             res.send("Website does not exist!")
//         }
//     } catch (error) {
//         res.send("!")
//     }
// }

// export async function updateProduct(req, res){
//     const {...data} = req.body;
//     const {id} = req.params;
//     console.log("data:", data)
//     try {
//         const product= await ProductModel.findOne({code: data.code, deletedAt: null})
//         if(product){
//             throw("code")
//         }
//         await ProductModel.updateOne(
//             {  _id: new ObjectId(id), deletedAt: null },
//             {
//                 ...data,
//                 updatedAt: new Date()
//             })
//             res.redirect("/products")
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

//         res.render("pages/products/form", {
//             title: "Update Products",
//             mode: "Update",
//             product: {...data, id: id},
//             err
//         })
//     }
// }

// export async function renderPageDeleteProduct(req, res){
//     try {
//         const {id} = req.params;
//         const category = await ProductModel.findOne({_id: new ObjectId(id), deletedAt: null})
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

// export async function deleteProduct(req, res){
//     const {id} = req.body;
//     try {
//         await ProductModel.updateOne(
//             {  _id: new ObjectId(id) },
//             {
//                 deletedAt: new Date()
//             })
//             res.redirect("/products")
//     } catch (error) {
//         console.log(error)
//         res.send("Delete product failed!");
//     }
// }

