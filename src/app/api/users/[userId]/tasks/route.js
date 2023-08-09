import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"

connectDb();
export async function GET(request, { params }) {
    const { userId } = params;
    console.log(userId);
    try {
        const tasks = await Task.find({
            userId: userId
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