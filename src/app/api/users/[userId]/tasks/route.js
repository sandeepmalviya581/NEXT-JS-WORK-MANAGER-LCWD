import { connectDb } from "@/helper/db";
import { Task } from "@/model/task";
import { NextResponse } from "next/server"

connectDb();
export async function GET(request, { params }) {
    const { userId } = params;
    console.log(userId);

    // const joseToken = request.cookies.get('joseToken')?.value;
    // const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
    // const userId = payload._doc._id;

    try {
        const tasks = await Task.find({
            userId: userId
        }).sort({ createdDate: -1, updatedDate: -1 });
        console.log(tasks);
        return NextResponse.json(tasks);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to fetch records.",
            error
        },{status: 500});
    }
}
