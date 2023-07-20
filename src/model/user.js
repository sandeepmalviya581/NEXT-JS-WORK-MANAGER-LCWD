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
    about: String,
    profileUrl: String


})

export const User = mongoose.models.users || mongoose.model("users", UserSchema)