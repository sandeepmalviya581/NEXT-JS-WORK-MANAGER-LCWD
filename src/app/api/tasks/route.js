import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

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

    const authToken = request.cookies.get('authToken')?.value;
    const data = jwt.verify(authToken, 'workmanager');


    const task = new Task({
        title, content, status,userId: data._id
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