import mongoose, { Schema } from "mongoose";

const UserBackupSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now()

    },
    role: {
        type: String,
        enum: ['USER_ADMIN', 'SUPER_ADMIN'],
        default: 'USER_ADMIN'
    },
    config:  mongoose.Schema.Types.Mixed,
    about: String,
    profileUrl: String


})

export const UserBackup = mongoose.models.usersbackup || mongoose.model("usersbackup", UserBackupSchema)