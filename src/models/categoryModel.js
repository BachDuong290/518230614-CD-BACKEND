import mongoose, { deleteModel, Types } from "mongoose";
import { updateCategory } from "../../src/controllers/categoryController.js";
const {Schema} = mongoose;

const categorySchema = new Schema ({
    code: {
        type: String,
        required: [true, "Required to enter product type code" ],
        minlength: [5, "Product type is 5 to 10 characters long."],
        maxlength: [10, "Product type is 5 to 10 characters long."]
    }, 
    name: {
        type: String,
        required: [true, "Required to enter product name" ],
    },
    image: {
        type: String,
        required: [true, "Required to enter product type image" ]
    },
    search: {
        type: String,
        required: [true, "Required to enter product search string" ]
    },
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}, {
    versionKey: false,
    collection: "categories"
})

const CategoryModel = mongoose.model("Category", categorySchema)

export default CategoryModel;