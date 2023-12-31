import mongoose, { Schema } from "mongoose";

const JiraSchema = new Schema({
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
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
    status: {
        type: String,
        enum: ['testing', 'in progress','blocked','code review'],
        default: 'in progress'
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    assigneeId: {
        type: mongoose.ObjectId,
        required: false
    },
    taskId: {
        type: mongoose.ObjectId,
        required: true
    },


})

export const Jira = mongoose.models.jira || mongoose.model("jira", JiraSchema)