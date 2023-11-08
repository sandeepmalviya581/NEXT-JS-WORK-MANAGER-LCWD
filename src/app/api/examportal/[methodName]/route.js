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
import { QuestionPaper } from "@/model/question_paper";

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'createQuestion') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id
            inputData.userId = uId;
            inputData.createdBy = uId;
            inputData.updatedBy = uId;

            const questionPaper = new QuestionPaper(
                inputData
            );

            try {
                let questionRes = await questionPaper.save();
                return NextResponse.json(
                    questionRes, {
                    status: 201
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create question.",
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

        else if (methodName === 'createMultipleSubTask') {

            let inputData = await request.json();
            console.log('Will send this data.');
            console.log(inputData);

            const joseToken = request.cookies.get('joseToken')?.value;
            // const data = jwt.verify(joseToken, 'workmanager');
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const data = payload;

            const userId = data._doc._id;



            try {

                const emailList = inputData.map((item) => item.assigneeEmail);

                const userList = await User.find({ "email": { "$in": emailList } });

                inputData.forEach((item) => {
                    // console.log('maited',userList.includes(item.assigneeEmail));
                    console.log('maited', item.assigneeEmail);
                    if (!emailList.includes(item.assigneeEmail)) {
                        throw `Invalid email ${item.assigneeEmail}`;
                    }
                });

                const lastResult = await Jira.findOne().sort('-_id');
                const jNo = lastResult.jiraNo;
                const no = jNo.split("-")[1];
                let x = Number(no) + 1;

                inputData.map((item) => {
                    userList.forEach((f) => {
                        if (item.assigneeEmail === f.email) {
                            item.assigneeId = f._id;
                        }
                    });
                    item.userId = userId;
                    item.description = ' ';
                    x = x + 1;
                    item.jiraNo = 'JIRA-' + x;
                    return item;
                });

                const resultDb = await Jira.insertMany(inputData);
                console.log(resultDb);

                return NextResponse.json(
                    resultDb, {
                    status: 201
                });

            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create jira task.",
                    success: false,
                    error
                }, {
                    status: 500
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

        } else if (methodName === 'updateJiraStatus') {
            try {
                const { jiraId, status } = await request.json();
                if (jiraId === null || jiraId === '') {
                    throw "Jira id can not be empty.";
                } else if (status === null || status === '') {
                    throw "Status can not be empty.";
                }
                const res = await Jira.updateOne({ _id: jiraId }, { status: status, updatedDate: Date.now() });
                return NextResponse.json(res);
            } catch (error) {
                return NextResponse.json({
                    message: "failed to update task status",
                    error
                }, { status: 500 });
            }

        }

        else if (methodName === 'getJiraByJiraNo') {
            console.log('getJiraByJiraNo api called.');
            let inputData = await request.json();
            try {
                let jiraResp = await Jira.findOne({
                    jiraNo: inputData.jiraNo
                });

                let jiraSubTask = await Jira.find({
                    taskId: jiraResp._id
                });

                let jiraComment = await JiraComment.find({
                    taskId: jiraResp._id
                })

                // jiraResp.subTasks=[];
                // let finalResult = jiraResp;
                // jiraResp.subTasks = [];

                // let obj = { ...jiraResp, 'subTasks': jiraResp };

                // Object.assign(finalResult, {subTasks: jiraSubTask});

                // console.log('with subtask ------', jiraSubTask);
                // console.log('main task', jiraResp);
                // console.log('my sub task', jiraSubTask);

                let result = {
                    jiraTask: jiraResp,
                    jiraSubTask: jiraSubTask,
                    jiraComment: jiraComment
                };

                return NextResponse.json(
                    result, {
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
                });
            }
        }

        else if (methodName === 'updatJiraTask') {
            let inputData = await request.json();
            console.log('update jira input================>>>>>>>>>>>', inputData);
            try {
                // let res = '';
                // if (inputData.fieldName === 'summary') {
                //     res = await Jira.updateOne({ _id: inputData._id }, { summary: inputData.summary, updatedDate: Date.now() });
                // } else if (inputData.fieldName === 'desciption') {
                //     res = await Jira.updateOne({ _id: inputData._id }, { desciption: inputData.desciption, updatedDate: Date.now() });
                // }

                let res = await Jira.updateOne({ _id: inputData._id }, { description: inputData.description, summary: inputData.summary, updatedDate: Date.now() });


                // console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to update jira task.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }

        else if (methodName === 'deleteJiraTask') {
            let inputData = await request.json();
            console.log('my input', inputData);
            try {
                let res = await Jira.deleteOne({ _id: inputData._id });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete jira task.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }

        else if (methodName === 'deleteJiraComment') {
            let inputData = await request.json();
            console.log('my input', inputData);
            try {
                let res = await JiraComment.deleteOne({ _id: inputData._id });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete jira comment.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }

        else if (methodName === 'updateJiraComment') {
            let inputData = await request.json();
            console.log('my input=================>>>>>>>>>>>>>', inputData);
            try {

                let res = await JiraComment.updateOne({ _id: inputData.commentId }, { description: inputData.description, updatedDate: Date.now() });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete jira comment.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }

        else if (methodName === 'deleteAllJiraComment') {
            let inputData = await request.json();
            console.log('my input', inputData);
            try {
                let res = await JiraComment.deleteMany({ taskId: inputData._id });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete jira comment.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }

        else if (methodName === 'updateJiraComment') {
            let inputData = await request.json();
            try {
                let res = await JiraComment.updateOne({ taskId: inputData._id });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete jira comment.",
                    success: false,
                    error
                }, {
                    status: 500
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

    const { methodName, jiraNo } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {





        if (methodName === 'getAllQuestion') {
            try {
                // const questionRes = await QuestionPaper.find();


                const questionRes = await QuestionPaper.aggregate([
                    {
                        $lookup: {
                            from: 'users', // The name of the other collection (case-sensitive)
                            localField: 'createdBy',
                            foreignField: '_id',
                            as: 'userInfo' // The field where the joined user data will be stored
                        }
                    },

                    // {
                    //     $project: {

                    //     //   '_id':1
                    //       // Exclude the _id field if you want
                    //       '_id': 0,
                    //       // Exclude the entire 'authorInfo' array if you want
                    //       'userInfo': 1
                    //     }
                    //   },
                ]);

                console.log('quest->>>>>>>>>>>', questionRes);
                return NextResponse.json(
                    questionRes, {
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