import mongoose, { Schema } from "mongoose";

const ExamSchema = new Schema({
    addedDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    className: {
        type: String,
        enum: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th']
    },

    type: {
        type: String,
        enum: ['Quarterly', 'Half-Yearly', 'Final']
    },

    examDate: {
        type: String,
        required: true,

    },

    Subject: {
        type: String,
        required: true,

    },

    createdBy: {
        type: mongoose.ObjectId,
        required: true
    },
    updatedBy: {
        type: mongoose.ObjectId,
        required: true
    }
})

export const Exam = mongoose.models.exam || mongoose.model("exam", ExamSchema)