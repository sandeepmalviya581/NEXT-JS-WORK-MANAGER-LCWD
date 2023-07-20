import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },


})

export const Task = mongoose.models.task || mongoose.model("task", TaskSchema)