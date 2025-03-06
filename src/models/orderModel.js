import mongoose, { Types } from "mongoose";
const {Schema} = mongoose;

const orderItemSchema = new Schema (
    {
        productCode: String,
        productId: Schema.Types.ObjectId,
        quantity: Number,
        total: Number,
        price: Number,
        color: {
            type: [String],
            enum: ["black", "pink", "yellow", "red"]
        },
    }, {
        versionKey: false,
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
        total: Number,
        discount: Number,
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

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;