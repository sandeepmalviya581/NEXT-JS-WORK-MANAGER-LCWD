import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { User } from "@/model/user";

connectDb();
export async function GET(request) {
    try {
        console.log("local storage");
        const authToken = request.cookies.get('authToken')?.value;
        const data = jwt.verify(authToken, 'workmanager');
        const user = await User.findById(data._id).select('-password');
        console.log('data in user api called agined api');
        console.log(user);

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({
            message: "failed to fetch records.",
            error
        });
    }
}

