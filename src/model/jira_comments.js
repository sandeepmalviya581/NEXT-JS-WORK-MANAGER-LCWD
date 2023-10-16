import mongoose, { Schema } from "mongoose";

const JiraCommentSchema = new Schema({
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
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    taskId: {
        type: mongoose.ObjectId,
        required: true
    },


})

export const JiraComment = mongoose.models.jira_comment || mongoose.model("jira_comment", JiraCommentSchema)