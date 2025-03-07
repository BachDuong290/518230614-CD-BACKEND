import mongoose, { Types } from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema ({
    code: {
        type: String,
        required: [true, "Required to enter product code" ],
        minlength: [5, "Product type is 5 to 10 characters long."],
        maxlength: [10, "Product type is 5 to 10 characters long."]
    }, 
    name: {
        type: String,
        required: [true, "Required to enter product name" ],
    },
    price: {
        type: Number,
        required: [true, "Required to enter product name" ],
    },
    search: {
        type: String,
        required: [true, "Required to enter product search string" ]
    },
    capacity: {
        type: [String],
        enum: ["150ml", "250ml", "550ml", "1 piece", "Other"]
    },
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL"]
    },
    colors: {
        type: [String],
        enum: ["black", "pink", "yellow", "red"]
    },
    active: String,
    description: String,
    information: String,
    images: [String],
    categoryId: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}, {
    versionKey: false,
    collection: "products",
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

productSchema.virtual("category", {
    ref: "Category",
    localField: "categoryId",
    foreignField: "_id",
    justOne: true
})

// productSchema.virtual("categoryIdString").get(function(){
//     return !! this.capacityId? this.capacityId.toString() : ""
// })

const ProductModel = mongoose.model("Product", productSchema)

export default ProductModel;