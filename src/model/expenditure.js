import mongoose, { Schema } from "mongoose";

const ExpenditureSchema = new Schema({
    expenditure_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            'Food',
            'Transport',
            'Entertainment',
            'Utilities',
            'Shopping',
            'Health',
            'Education',
            'Housing',
            'Insurance',
            'Travel',
            'Bills',
            'Gifts',
            'Personal Care',
            'Debt',
            'Investments',
            'Other',
        ],
        required: true,
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

export const Expenditure = mongoose.models.expenditure || mongoose.model("expenditure", ExpenditureSchema)