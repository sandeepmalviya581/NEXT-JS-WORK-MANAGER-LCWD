import mongoose, { Schema } from "mongoose";

const SugarReportSchema = new Schema({
    name: {
        type: String,
        enum: ['Mummy', 'Dadi'],
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    stage: {
        type: String,
        enum: ['Before a meal', 'After a meal']
    },
    createdBy: {
        type: mongoose.ObjectId,
        required: true
    },
    updatedBy: {
        type: mongoose.ObjectId
    }
})

export const SugarReport = mongoose.models.sugarreport || mongoose.model("sugarreport", SugarReportSchema)