import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import { Task } from "@/model/task";
import jwt from 'jsonwebtoken'

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
                    message: "failed to fetch records."
                });
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
                });

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
                    message: "failed to fetch records."
                });
            }

        } else if (methodName === 'getAllCount') {
            const countMap = {
                totalUser: 0,
                totalUserTask: 0
            };

            try {

                const authToken = request.cookies.get('authToken')?.value;
                const data = jwt.verify(authToken, 'workmanager');

                const totalUser = await User.count();
                const totalUserTask = await Task.find({
                    userId: data._id
                }).count();
                countMap.totalUser = totalUser;
                countMap.totalUserTask = totalUserTask;
                console.log('countMap', countMap);



                //  const agg=   Task.aggregate([
                //         {
                //           $match: {
                //             quantity: { $userId: userId } // Apply your "where" condition here
                //           }
                //         },
                //         {
                //           $group: {
                //             _id: "$status",
                //             totalQuantity: { $sum: "$status" }
                //           }
                //         }
                //       ]);

                // const agg = await Task.aggregate([
                //     {
                //         "$match": { userId: data._id }
                //      },
                  
                //     { "$group": { _id: "$status", count: { $sum: 1 } } }
                // ])

                // console.log('aggree');
                // console.log(agg);







                return NextResponse.json(countMap);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to fetch records."
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


export async function GET(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'getRandomName') {
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