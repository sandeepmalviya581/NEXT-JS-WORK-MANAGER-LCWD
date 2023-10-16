import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server"
import { HealthChart } from "@/model/healthchart";
import jwt from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose';
import { HealthChartBackup } from "@/model/healthchart_backup";
import { User } from "@/model/user";
import { UserBackup } from "@/model/user_backup";
import { Task } from "@/model/task";
import { TaskBackup } from "@/model/task_backup";
import { Jira } from "@/model/jira";
import { JiraComment } from "@/model/jira_comments";

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'createJiraTask') {

            let dataa = await request.json();
            console.log('Will send this data.');
            console.log(dataa);

            const joseToken = request.cookies.get('joseToken')?.value;
            // const data = jwt.verify(joseToken, 'workmanager');
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const data = payload;

            dataa.userId = data._doc._id

            // dataa = dataa.map(item => {
            //     item.userId = data._doc._id
            //     return item;
            // });
            // console.log('After add user id.');
            // console.log(dataa);

            try {

                // const deletedStatus = await HealthChart.deleteMany({
                //     userId: data._doc._id
                // })
                // console.log('deletedStatus');
                // console.log(deletedStatus);

                const jira = new Jira(
                    dataa
                );

                let createdChart = await jira.save(dataa);
                // console.log('Result data');
                // console.log(createdChart);


                // console.log('after convert to bool');
                // console.log(createdChart);
                return NextResponse.json(
                    createdChart, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create jira task.",
                    success: false,
                    error
                }, {
                    status: 400
                }

                );

            }


        } else if (methodName === 'createJiraComment') {

            let dataa = await request.json();
            console.log('Will send this data.');
            console.log(dataa);

            const joseToken = request.cookies.get('joseToken')?.value;
            // const data = jwt.verify(joseToken, 'workmanager');
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const data = payload;

            dataa.userId = data._doc._id



            try {

                const jiraComment = new JiraComment(
                    dataa
                );

                let createdChart = await jiraComment.save(dataa);
                // console.log('Result data');
                // console.log(createdChart);


                // console.log('after convert to bool');
                // console.log(createdChart);
                return NextResponse.json(
                    createdChart, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create jira task.",
                    success: false,
                    error
                }, {
                    status: 400
                }

                );

            }
        }

        else if (methodName === 'createJiraSubTask') {

            let dataa = await request.json();
            console.log('Will send this data.');
            console.log(dataa);

            const joseToken = request.cookies.get('joseToken')?.value;
            // const data = jwt.verify(joseToken, 'workmanager');
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const data = payload;

            dataa.userId = data._doc._id



            try {

                const jiraComment = new JiraComment(
                    dataa
                );

                let createdChart = await jiraComment.save(dataa);
                // console.log('Result data');
                // console.log(createdChart);


                // console.log('after convert to bool');
                // console.log(createdChart);
                return NextResponse.json(
                    createdChart, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create jira task.",
                    success: false,
                    error
                }, {
                    status: 400
                }

                );

            }
        }


        else if (methodName === 'backuptable') {
            console.log('healthchartbackup api called');
            try {
                let healthChartTable = await HealthChart.find();
                console.log('All data fetched.');
                const deletedStatus1 = await HealthChartBackup.deleteMany();
                let savedBackupTable = HealthChartBackup.insertMany(healthChartTable);
                const healthCount = healthChartTable.length;
                console.log(healthCount);

                let userTable = await User.find();
                console.log('All data fetched.');
                const deletedStatus2 = await UserBackup.deleteMany();
                let savedBackupTable1 = UserBackup.insertMany(userTable);
                const userCount = userTable.length;
                console.log(userCount);

                let taskTable = await Task.find();
                console.log('All data fetched.');
                const deletedStatus3 = await TaskBackup.deleteMany();
                let savedBackupTable2 = TaskBackup.insertMany(taskTable);
                const taskCount = taskTable.length;
                console.log(taskCount);
                console.log('All data inserted into health chart backup table.');
                return NextResponse.json({
                    message: "Backup completed",
                    status: true,
                    result: {
                        'userCount': userCount,
                        'taskCount': taskCount,
                        'healthChartCount': healthCount
                    }
                });
            } catch (error) {
                console.log(error);
                return NextResponse.json({
                    message: "Failed to backup",
                    error
                }, { status: 500 });
            }

        }



        else if (methodName === 'bktblcnt') {
            console.log('healthchartbackup api called');
            try {
                let hcCount = await HealthChart.count();
                let hcBkCount = await HealthChartBackup.count();
                let userCount = await User.count();
                const userBkCount = await UserBackup.count();
                let tCount = await Task.count();
                const tBkCount = await TaskBackup.count();

                let list = [];
                let hbObj = {
                    tableName: 'user',
                    current: userCount,
                    bk: userBkCount
                }
                list.push(hbObj);

                let uObj = {
                    tableName: 'Health Chart',
                    current: hcCount,
                    bk: hcBkCount
                }
                list.push(uObj);

                let tObj = {
                    tableName: 'Task',
                    current: tCount,
                    bk: tBkCount
                }
                list.push(tObj);
                return NextResponse.json(list);
            } catch (error) {
                console.log(error);
                return NextResponse.json({
                    message: "Failed to fetch records",
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

        else if (methodName === 'getAllJiraTask') {
            try {
                const jiraResp = await Jira.find();
                return NextResponse.json(
                    jiraResp, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to fetch jira task.",
                    success: false,
                    error
                }, {
                    status: 500
                }

                );

            }
        }

    }
    return NextResponse.json({
        message: "Not found"
    }, {
        status: 404
    });


}