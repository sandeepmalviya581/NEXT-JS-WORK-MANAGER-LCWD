import mongoose, { Schema } from "mongoose";

const QuestionPaperSchema = new Schema({
    questionDesc: {
        type: String,
        required: true,
    },
    optionA: {
        type: String,
        required: true,
    },
    optionB: {
        type: String,
        required: true,
    },
    optionC: {
        type: String,
        required: true,
    },
    optionD: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
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
    answer: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        required: true
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

export const QuestionPaper = mongoose.models.question_paper || mongoose.model("question_paper", QuestionPaperSchema)