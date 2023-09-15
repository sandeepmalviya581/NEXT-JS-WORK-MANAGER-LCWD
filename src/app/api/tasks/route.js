import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { jwtVerify } from 'jose';

connectDb();
export async function GET(request) {
    let users = [];
    try {
        users = await Task.find();
        console.log(users);
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({
            message: "failed to fetch records."
        },{status: 500});
    }
}


export async function POST(request) {
    const { title, content ,status} = await request.json();

    const joseToken = request.cookies.get('joseToken')?.value;
    // const data = jwt.verify(joseToken, 'workmanager');
    const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));


    const task = new Task({
        title, content, status,userId: payload._doc._id
    });

    try {
        const createdTask = await task.save();
        console.log(createdTask);
        return NextResponse.json(
            createdTask, {
            status: 201
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to create task.",
            success: false,
            error
        }, {
            status: 400
        }

        );

    }
}