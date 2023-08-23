import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server"
import { HealthChart } from "@/model/healthchart";
import jwt from 'jsonwebtoken'

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'createHealthChart') {

            let dataa = await request.json();
            console.log('Will send this data.');
            console.log(dataa);

            const authToken = request.cookies.get('authToken')?.value;
            const data = jwt.verify(authToken, 'workmanager');

            dataa = dataa.map(item => {
                item.userId = data._id
                return item;
            });
            console.log('After add user id.');
            console.log(dataa);

            try {

                const deletedStatus = await HealthChart.deleteMany({
                    userId: data._id
                })
                // console.log(deletedStatus);

                let createdChart = HealthChart.insertMany(dataa);
                console.log('Result data');
                console.log(createdChart);

                // createdChart = await createdChart.map((item, i) => {
                //     item.index = i;
                //     // item.kapalBhati = (item.kapalBhati === 'true');
                //     // item.hotWater = (item.hotWater === 'true');
                //     // item.exercise = (item.exercise === 'true');
                //     // item.morningWalk = (item.morningWalk === 'true');
                //     // item.eveningWalk = (item.eveningWalk === 'true');
                //     // item.nightWalk = (item.nightWalk === 'true');
                //     return item;

                // });
                console.log('after convert to bool');
                console.log(createdChart);
                return NextResponse.json(
                    createdChart, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create health chart.",
                    success: false,
                    error
                }, {
                    status: 400
                }

                );

            }


        } else if (methodName === 'getHealthChartByUserId') {
            let { userId } = await request.json();
            console.log(userId);
            try {
                let result = await HealthChart.find({
                    userId: userId
                })
                // .sort({ createdDate: -1, updatedDate: -1 });


                // result = result.map((item, i) => {
                //     item.index = i;
                //     return item;
                // });

               
                console.log('modified list.');
                console.log(result);
                return NextResponse.json(result);
            } catch (error) {
                console.log(error);
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




// if (methodName === 'getAllUser') {
//     const { pageSize, pageNumber } = await request.json();
//     console.log(pageSize, pageNumber);
//     let users = [];
//     try {
//         users = await User.find().select('-password');
//         console.log(users);
//         return NextResponse.json(users);
//     } catch (error) {
//         return NextResponse.json({
//             message: "failed to fetch records."
//         });
//     }


// }



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