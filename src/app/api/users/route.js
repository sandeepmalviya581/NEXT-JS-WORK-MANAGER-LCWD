import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

connectDb();
export async function GET(request) {
    let users = [];
    try {
        users = await User.find().select('-password');

        console.log(users);
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({
            message: "failed to fetch records."
        });
    }
}


export async function POST(request) {
    const { name, email, password, about, profileUrl } = await request.json();
    const user = new User({
        name, email, password, about, profileUrl
    });

    try {
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        const createdUser = await user.save();
        console.log(createdUser);
        return NextResponse.json(
            user, {
            status: 201
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to create user.",
            success: false,
            errorMsg: error
        });

    }
}