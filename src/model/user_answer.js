import mongoose, { Schema } from "mongoose";

const UserAnswerSchema = new Schema({
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
        enum: ['', 'A', 'B', 'C', 'D']
    },

    userId: {
        type: mongoose.ObjectId,
        required: true
    },

    questionId: {
        type: mongoose.ObjectId,
        required: true
    }
})

export const UserAnswer = mongoose.models.useranswer || mongoose.model("useranswer", UserAnswerSchema)