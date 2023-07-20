import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"

connectDb();
export async function GET(request, { params }) {

    const { taskId } = params;
    console.log(taskId);
    try {
        const tasks = await Task.findOne({
            _id: taskId
        });
        console.log(tasks);
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to fetch records."
        });
    }
}


export async function DELETE(request, { params }) {
    const { taskId } = params;
    try {
        const deletedStatus = await Task.deleteOne({
            _id: taskId
        })
        console.log(deletedStatus);
        return NextResponse.json(deletedStatus);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to delete task."
        });
    }
}


export async function PUT(request, { params }) {
    const { taskId } = params;
    try {
        const {  title, content} = await request.json();
        const taskDb = await Task.findById(taskId);
        if(taskDb==null){
            return NextResponse.json({
                message:'Task not found.'
            });
        }
        taskDb.title = title;
        taskDb.content = content;
        const updatedTask = await taskDb.save();
        console.log(updatedTask);
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Unable to update task"
        });
    }
}


