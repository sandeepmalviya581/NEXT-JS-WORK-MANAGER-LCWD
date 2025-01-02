import mongoose, { Schema } from "mongoose";

const BorrowDetailsSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    borrower_id: {
        type: mongoose.ObjectId,
        required: false
    },
    status: {
        type: String,
        enum: ['debit', 'credit'],
        default: 'debit'
    },
    amount: {
        type: Number,
        required: true
    },
    is_completed: {
        type: Boolean,
        required: false
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

export const BorrowDetails = mongoose.models.borrowdetails || mongoose.model("borrowdetails", BorrowDetailsSchema)