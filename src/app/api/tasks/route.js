import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"

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
        });
    }
}


export async function POST(request) {
    const { title, content, userId } = await request.json();
    const task = new Task({
        title, content, userId
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