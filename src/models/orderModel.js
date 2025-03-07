import mongoose, { Types } from "mongoose";
const {Schema} = mongoose;

const orderItemSchema = new Schema (
    {
        productId: Schema.Types.ObjectId,
        quantity: [Number],
        price: Number,
        color: {
            type: [String],
            enum: ["black", "pink", "yellow", "red"]
        },
        capacity: {
            type: [String],
            enum: ["150ml", "250ml", "550ml", "1 piece", "Other"]
        },
    }, {
        versionKey: false,
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    });

const bllingAddressSchema = new Schema (
    {
        name: String,
        email: String,
        phoneNumber: Number,
        address: String,
        district: String,
        city: String
    }, {
        versionKey: false,
        _id: false,
    });

const orderSchema = new Schema(
    {
        orderNo: String,
        status: {
            type: String,
            enum: ["created", "completed", "canceled", "delivering"]
        },
        orderItems: {
            type: [orderItemSchema],
            required: [true, "Products must be included in the order"]
        },
        bllingAddress: {
            type: bllingAddressSchema,
        },
        total: Number,
        discount: {
            type: Number,
            required: true,  
            min: [0, 'Discount cannot be less than 0%'], 
            max: [80, 'Discount cannot exceed 80%'],  
            default: 0 
        },
        numbericalOrder: Number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }, {
        versionKey: false,
        collection: "orders",
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    })

    orderItemSchema.virtual("product", {
        ref: "Product",
        localField: "productId",
        foreignField: "_id",
        justOne: true
    })

    orderItemSchema.virtual("priceFormatString").get(function(){
        return this.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        })
    })

    orderSchema.virtual("totalFormatString").get(function(){
        return this.total.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        })
    })

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;