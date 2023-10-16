import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import { Task } from "@/model/task";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { jwtVerify } from 'jose';

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {

        if (methodName === 'getAllUser') {
            const { pageSize, page, search } = await request.json();
            console.log(pageSize, page);



            const ITEMS_PER_PAGE = pageSize || 10;
            console.log('ITEMS_PER_PAGE');
            console.log(ITEMS_PER_PAGE)
            console.log('pageNumber');
            console.log(page)
            const searchQuery = search || '';
            console.log("searchQuery-> ", searchQuery)

            try {
                // users = await User.find().select('-password');
                // console.log(users);
                // return NextResponse.json(users);

                const searchFilter = {
                    $or: [
                        { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive name search
                        { email: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive name search

                        // Add additional search fields here
                    ],
                };


                const pipeline = [
                    { $match: searchFilter },
                    {
                        $facet: {
                            data: [
                                { $skip: (page - 1) * ITEMS_PER_PAGE },
                                { $limit: ITEMS_PER_PAGE },
                            ],
                            totalCount: [
                                { $group: { _id: null, count: { $sum: 1 } } },
                            ],
                        }
                    },
                    { $unwind: "$totalCount" },
                    { $project: { data: 1, totalCount: "$totalCount.count" } },
                ];
                const result = await User.aggregate(pipeline);

                if (result.length > 0) {
                    const { data, totalCount } = result[0];
                    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

                    return NextResponse.json({
                        data, totalCount, totalPages, pageSize, page
                    });
                }


            } catch (error) {
                return NextResponse.json({
                    message: "failed to fetch records.",
                    error
                }, { status: 500 });
            }


        } else if (methodName === 'createManyUser') {

            const passw = bcrypt.hashSync('12345', parseInt(process.env.BCRYPT_SALT));

            let list = [];
            for (let index = 201; index < 1000; index++) {
                const obj = { name: 'Gourav' + index, email: 'test@gmail.com' + index, password: passw, about: 'about testing' + index, profileUrl: 'profie testing.' + index }
                list.push(obj);
            }

            const result = await User.insertMany(list);

            try {
                console.log(result);
                return NextResponse.json(
                    result, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create user.",
                    success: false,
                    errorMsg: error
                }, { status: 500 });

            }

        } else if (methodName === 'getAllUserWithSearch') {


            let users = [];
            try {

                const { searchQuery } = await request.json();
                console.log(searchQuery);

                users = await User.find({
                    "$or": [
                        { "name": { "$regex": searchQuery, "$options": "i" } },
                        { "email": { "$regex": searchQuery, "$options": "i" } },
                        { "about": { "$regex": searchQuery, "$options": "i" } }

                    ]
                }).select('-password');

                console.log(users);
                return NextResponse.json(users);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to fetch records.",

                    error
                }, { status: 500 });
            }

        } else if (methodName === 'getAllCount') {
            const countMap = {
                totalUser: 0,
                totalUserTask: 0
            };

            try {

                const joseToken = request.cookies.get('joseToken')?.value;
                // const data = jwt.verify(authToken, 'workmanager');

                const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));


                const totalUser = await User.count();
                const totalUserTask = await Task.find({
                    userId: payload._doc._id
                }).count();
                countMap.totalUser = totalUser;
                countMap.totalUserTask = totalUserTask;

                const userTaskGroup = await Task.aggregate([
                    {
                        "$match": { userId: new ObjectId(payload._doc._id) }
                    },

                    { "$group": { _id: "$status", count: { $sum: 1 } } }
                ]);
                countMap.userTaskGroup = userTaskGroup;

                console.log('countMap', countMap);






                return NextResponse.json(countMap);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to fetch records.",
                    error
                }, { status: 500 });
            }

        }

        else if (methodName === 'updateTaskStatus') {
            try {
                const { taskId, status } = await request.json();
                if (taskId === null || taskId === '') {
                    throw "Task id can not be empty.";
                } else if (status === null || status === '') {
                    throw "Status can not be empty.";
                } else if (status !== 'pending' && status !== 'completed') {
                    throw "Status should be pending or completed.";
                }
                const res = await Task.updateOne({ _id: taskId }, { status: status, updatedDate: Date.now() });
                return NextResponse.json(res);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to update task status",
                    error
                }, { status: 500 });
            }

        }

        else if (methodName === 'updateUserConfig') {
            // console.log(config);
            // console.log(userId);
            try {
                const { config, userId } = await request.json();
                console.log(config);
                console.log(userId);
                const res = await User.updateOne({ _id: userId }, { config: config, updatedDate: Date.now() });
                return NextResponse.json(res);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to update user config",
                    error
                }, { status: 500 });
            }

        }
    }
    return NextResponse.json({
        message: "Not found"
    }, {
        status: 404
    });


}


export async function GET(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'findUsers') {
            try {
                const users = await User.find({}, { name: 1, email: 1 }).sort({ name: 1 });
                // console.log(users);
                return NextResponse.json(
                    users, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "failed to get random name.",
                    success: false,
                    error
                }, { status: 500 });

            }

        } else if (methodName === 'getRandomName') {
            try {
                // const ranNameResult = await getRondomNameAPI();

                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const movies = await response.json();
                console.log(movies);

                console.log(movies);
                return NextResponse.json(
                    movies, {
                    status: 200
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "failed to get random name.",
                    success: false,
                    errorMsg: error
                });

            }

        }
    }
    return NextResponse.json({
        message: "Not found"
    }, {
        status: 404
    });


}