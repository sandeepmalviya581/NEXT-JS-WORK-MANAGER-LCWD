import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { User } from "@/model/user";
import { jwtVerify } from 'jose';

connectDb();
export async function GET(request) {
    // try {
    console.log("my self api=>>>>>>.");
    const joseToken = request.cookies.get('joseToken')?.value;
    // console.log('request->>>>',request);



    if (!joseToken) {
        return NextResponse.json({
            message: 'User is not logged in.'
        });
    }
    // const data = jwt.verify(joseToken, 'workmanager');
    const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
    console.log(payload);
    const data = payload._doc;
    // const user = await User.findById(data._id).select('-password');
    console.log('data in user api called agined api');
    // console.log(user);



    return NextResponse.json(data);

}

