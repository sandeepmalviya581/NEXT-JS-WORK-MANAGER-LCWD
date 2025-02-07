import mongoose, { Schema } from "mongoose";

const GroceryItemSchema = new Schema({
    grocery_item_hindi: {
        type: String,
        required: true,
    },
    grocery_item_eng: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now()

    },
    updated_date: {
        type: Date,
        default: Date.now()
    }
})

export const GroceryItem = mongoose.models.groceryitem || mongoose.model("groceryitem", GroceryItemSchema)