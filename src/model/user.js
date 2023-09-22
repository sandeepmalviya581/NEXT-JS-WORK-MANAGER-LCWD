import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
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

export const User = mongoose.models.users || mongoose.model("users", UserSchema)