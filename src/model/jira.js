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
        enum: ['backlog', 'blocked', 'testing', 'inProgress', 'done', 'codeReview'],
        default: 'backlog'
    },
    type: {
        type: String,
        enum: ['task', 'subTask'],
        default: 'task'
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    taskId: {
        type: mongoose.ObjectId,
        required: false
    },
    assigneeId: {
        type: mongoose.ObjectId,
        required: false
    },
    jiraNo: {
        type: String,
        required: true,
        unique: true
    }


})

export const Jira = mongoose.models.jira || mongoose.model("jira", JiraSchema)