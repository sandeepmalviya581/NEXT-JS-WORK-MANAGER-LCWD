import mongoose, { Schema } from "mongoose";

const GroceryItemSelectionSchema = new Schema({
    grocery_item_hindi: {
        type: String,
        required: true,
    },
    grocery_item_eng: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number
    },
    uom: {
        type: String
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: mongoose.ObjectId,
        required: true
    },

})

export const GroceryItemSelection = mongoose.models.groceryitemselection || mongoose.model("groceryitemselection", GroceryItemSelectionSchema)