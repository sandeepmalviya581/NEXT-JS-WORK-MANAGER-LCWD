import mongoose, { Schema } from "mongoose";

const BorrowerSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mobile_no: {
        type: String
    },
    created_by: {
        type: mongoose.ObjectId,
        required: true
    },
    updated_by: {
        type: mongoose.ObjectId
    },
    created_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_date: {
        type: Date,
        default: Date.now()
    }
})

export const Borrower = mongoose.models.borrower || mongoose.model("borrower", BorrowerSchema)