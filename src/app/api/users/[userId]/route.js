import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"

connectDb();
export async function GET(request, { params }) {

    const { userId } = params;
    console.log(userId);
    try {
        const users = await User.findOne({
            _id: userId
        }).select('-password')
        console.log(users);
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to fetch records."
        },{status: 500});
    }
}


export async function DELETE(request, { params }) {

    const { userId } = params;
    try {
        const deletedStatus = await User.deleteOne({
            _id: userId
        })
        console.log(deletedStatus);
        return NextResponse.json(deletedStatus);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to delete user."
        },{status: 500});
    }
}


export async function PUT(request, { params }) {
    const { userId } = params;
    try {
        const { name, email, password, about, profileUrl } = await request.json();
        const userDb = await User.findById(userId);
        if(userDb==null){
            return NextResponse.json({
                message:'User not found.'
            });
        }
        userDb.name = name;
        userDb.email = email;
        userDb.about = about;
        userDb.profileUrl;
        const updatedUser = await userDb.save();
        console.log(updatedUser);
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Unable to update user",
            status:false,
            error
        }, { status: 400 });
    }
}


