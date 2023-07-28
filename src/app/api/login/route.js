import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDb();
export async function POST(request) {
    const { email, password } = await request.json();
    try {

        const user = await User.findOne({
            email: email
        });

        if (user == null) {
            throw new Error("User not found !!");
        }

        const matched = bcrypt.compareSync(password, user.password);

        if (!matched) {
            throw new Error("Password not matched !!");
        }

        const authToken = jwt.sign({
            _id: user._id,
            name: user.name
        }, 'workmanager');


        console.log(authToken);
        return NextResponse.json(
            user, {
            status: 200
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to login.",
            success: false,
            error
        }
            , { status: 401 }
        );

    }
}