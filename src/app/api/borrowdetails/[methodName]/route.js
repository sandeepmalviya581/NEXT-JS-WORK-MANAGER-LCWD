import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server"
import { HealthChart } from "@/model/healthchart";
import { SignJWT, jwtVerify } from 'jose';
import { HealthChartBackup } from "@/model/healthchart_backup";
import { User } from "@/model/user";
import { UserBackup } from "@/model/user_backup";
import { Task } from "@/model/task";
import { TaskBackup } from "@/model/task_backup";
import { Jira } from "@/model/jira";
import { JiraComment } from "@/model/jira_comments";
import { QuestionPaper } from "@/model/question_paper";
import { UserAnswer } from "@/model/user_answer";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { TimeTable } from "@/model/timetable";
import { Borrower } from "@/model/borrower";
import { BorrowDetails } from "@/model/borrow_details";
import { notNullAndNotUndefined } from "@/helper/utility";

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'addBorrower') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id
            inputData.createdBy = uId;
            inputData.updatedBy = uId;

            const borrower = new Borrower(
                inputData
            );

            try {
                let response = '';
                if (inputData._id === undefined || inputData._id === null || inputData._id === '') {
                    response = await borrower.save();
                } else {
                    console.log(inputData._id, borrower);
                    // const res = await Jira.updateOne({ _id: jiraId }, { status: status, updatedDate: Date.now() });
                    response = await Borrower.updateOne({ _id: inputData._id }, inputData);
                }
                return NextResponse.json(
                    response, {
                    status: 201
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create.",
                    success: false,
                    error
                }, {
                    status: 400
                }
                );
            }
        }
        if (methodName === 'addBorrowDetails') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id
            inputData.created_by = uId;
            inputData.updated_by = uId;
            const borrowDetails = new BorrowDetails(
                inputData
            );
            try {
                let response = '';
                if (inputData._id === undefined || inputData._id === null || inputData._id === '') {
                    response = await borrowDetails.save();
                } else {
                    response = await BorrowDetails.updateOne({ _id: inputData._id }, inputData);
                }
                return NextResponse.json(
                    response, {
                    status: 201
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to add borrow details.",
                    error
                }, {
                    status: 500
                }
                );
            }
        }

        else if (methodName === 'getAllBorrowDetails') {
            try {
                // const res = await BorrowDetails.find();
                let inputData = await request.json();
                const month = inputData.month; // Example: null or undefined if not provided
                const year = inputData.year;  // Example: null or undefined if not provided

                const pipeline = [
                    {
                        $lookup: {
                            from: 'borrowers', // The name of the other collection (case-sensitive)
                            localField: 'borrower_id',
                            foreignField: '_id',
                            as: 'borrwerInfo' // The field where the joined user data will be stored
                        }
                    },
                    {
                        $unwind: {
                            path: "$borrwerInfo",
                            preserveNullAndEmptyArrays: true // Optional: Use this if you want to keep documents without a matching borrower
                        }
                    }
                ];

                if (notNullAndNotUndefined(month) && notNullAndNotUndefined(year)) {
                    pipeline.push({
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: [{ $month: "$created_date" }, month] },
                                    { $eq: [{ $year: "$created_date" }, year] }
                                ]
                            }
                        }
                    });
                }
                const res = await BorrowDetails.aggregate(pipeline);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to fetch.",
                    error
                }, {
                    status: 500
                }
                );

            }
        }

        
        else if (methodName === 'deleteBorrowDetails') {
            let inputData = await request.json();
            try {
                let res = await BorrowDetails.deleteOne({ _id: inputData._id });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete.",
                    error
                }, {
                    status: 500
                });
            }
        }


        else if (methodName === 'getAllStudentResult') {
            let inputData = await request.json();
            try {

                const questionRes = await UserAnswer.aggregate([

                    {
                        $match: { timeTableId: new ObjectId(inputData.timeTableId) }
                    },

                    {
                        $lookup: {
                            from: 'question_papers', // The name of the other collection (case-sensitive)
                            localField: 'questionId',
                            foreignField: '_id',
                            as: 'questionPaper' // The field where the joined user data will be stored
                        },
                    },

                    {
                        $unwind: '$questionPaper'
                    },

                    {
                        $lookup: {
                            from: 'users', // The name of the other collection (case-sensitive)
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userInfo' // The field where the joined user data will be stored

                        }
                    }

                    , {
                        $unwind: '$userInfo'
                    },
                ]);

                // console.log(questionRes);

                const groupByUserId = questionRes.reduce((group, product) => {
                    const { userId } = product;
                    group[userId] = group[userId] ?? [];
                    group[userId].push(product);
                    return group;
                }, {});

                const minusMarking = true;

                let list = [];
                for (let key in groupByUserId) {
                    const userAnsObj = groupByUserId[key];
                    console.log('userojb->>>>>>>', userAnsObj);
                    let obtainedMarks = 0;
                    let attemptQuestion = 0;
                    let totalNegativeMarks = 0;
                    let totalQuestion = 0;
                    let totalPositiveMarks = 0;
                    let totalCorrectAnswer = 0;
                    let totalWrongtAnswer = 0;
                    let fullName = '';
                    let email = '';

                    for (let uKey in userAnsObj) {
                        const insideUser = userAnsObj[uKey];
                        console.log('inside user->>>>>>>', insideUser);

                        if (insideUser.answer !== "") {
                            if (!minusMarking) {
                                const questionAnws = insideUser.questionPaper.answer;
                                if (insideUser.answer === questionAnws) {
                                    totalCorrectAnswer++;
                                    totalPositiveMarks = totalPositiveMarks + insideUser.questionPaper.number;
                                    obtainedMarks = obtainedMarks + insideUser.questionPaper.number;
                                } else {
                                    totalWrongtAnswer++;
                                }
                            } else {
                                const questionAnws = insideUser.questionPaper.answer;
                                if (insideUser.answer === questionAnws) {
                                    totalCorrectAnswer++;
                                    totalPositiveMarks = totalPositiveMarks + insideUser.questionPaper.number;
                                    obtainedMarks = obtainedMarks + insideUser.questionPaper.number;
                                } else {
                                    const negativedMarks = (insideUser.questionPaper.number) / 4;
                                    totalWrongtAnswer++;
                                    totalNegativeMarks = totalNegativeMarks - negativedMarks;
                                    obtainedMarks = obtainedMarks - negativedMarks;
                                }
                            }
                            attemptQuestion++;
                        }
                        totalQuestion++;
                        fullName = insideUser.userInfo.name;
                        email = insideUser.userInfo.email;
                    }
                    let finalUserResult = {
                        fullName, email,
                        userId: '',
                        userMarks: '',
                        attemptQuestion,
                        notAttemptQuestion: (totalQuestion - attemptQuestion),
                        totalQuestion,
                        totalNegativeMarks,
                        totalPositiveMarks,
                        totalCorrectAnswer,
                        totalWrongtAnswer
                    };
                    finalUserResult.userId = key;
                    finalUserResult.userMarks = obtainedMarks;
                    list.push(finalUserResult);
                }
                console.log('final result', list);
                list = list.sort(function (a, b) { return b.userMarks - a.userMarks || b.totalPositiveMarks - a.totalPositiveMarks });
                return NextResponse.json(
                    list, {
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

        else if (methodName === 'createTimeTable') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id
            inputData.userId = uId;
            inputData.createdBy = uId;
            inputData.updatedBy = uId;
            const timetable = new TimeTable(
                inputData
            );
            console.log('inputData', inputData);
            try {
                let timeTableRes = '';
                if (inputData._id === null || inputData._id === undefined || inputData._id === '') {
                    timeTableRes = await timetable.save();
                    console.log(timeTableRes);
                }
                else {
                    timeTableRes = await TimeTable.updateOne({ _id: inputData._id }, inputData);
                }
                return NextResponse.json(
                    timeTableRes, {
                    status: 201
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create time table.",
                    success: false,
                    error
                }, {
                    status: 500
                }
                );

            }


        }





        else if (methodName === 'saveAnswer') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id;

            const userAlreadyGaveExam = await UserAnswer.exists({ userId: uId, timeTableId: inputData[0].timeTableId });
            if (userAlreadyGaveExam !== null) {
                throw "User alreay has given exam.";
            }

            console.log('userAlreadyGaveExam->>>>>>>>>', userAlreadyGaveExam);
            const reqData = inputData.map(element => {
                element.userId = uId;
                return element;
            });
            // const userAnswer = new UserAnswer(
            //     inputData
            // );
            try {
                let ansRes = await UserAnswer.insertMany(reqData);
                return NextResponse.json(
                    ansRes, {
                    status: 201
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to create question.",
                    success: false,
                    error
                }, {
                    status: 500
                }
                );

            }


        }
        else if (methodName === 'deleteQuestion') {
            let inputData = await request.json();
            try {

                const userAlreadyGaveExam = await UserAnswer.exists({ questionId: inputData.questionId });
                if (userAlreadyGaveExam !== null) {
                    throw "You can not delete Question.";
                }
                let res = await QuestionPaper.deleteOne({ _id: inputData.questionId });
                console.log(res);
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete question.",
                    success: false,
                    error
                }, {
                    status: 500
                });
            }
        }


        else if (methodName === 'createJiraComment') {

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
            deleteQuestion
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

        if (methodName === 'getAllBorrower') {
            try {
                const res = await Borrower.find();
                return NextResponse.json(
                    res, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to fetch.",
                    error
                }, {
                    status: 500
                }
                );

            }
        }
        // else if (methodName === 'getAllBorrowDetails') {
        //     try {
        //         // const res = await BorrowDetails.find();
        //         const res = await BorrowDetails.aggregate([
        //             {
        //                 $lookup: {
        //                     from: 'borrowers', // The name of the other collection (case-sensitive)
        //                     localField: 'borrower_id',
        //                     foreignField: '_id',
        //                     as: 'borrwerInfo' // The field where the joined user data will be stored
        //                 }
        //             },
        //             {
        //                 $unwind: {
        //                     path: "$borrwerInfo",
        //                     preserveNullAndEmptyArrays: true // Optional: Use this if you want to keep documents without a matching borrower
        //                 }
        //             }
        //         ]);
        //         return NextResponse.json(
        //             res, {
        //             status: 200
        //         });
        //     } catch (error) {
        //         console.log(error)
        //         return NextResponse.json({
        //             message: "Failed to fetch.",
        //             error
        //         }, {
        //             status: 500
        //         }
        //         );

        //     }
        // }
    }
    return NextResponse.json({
        message: "Not found"
    }, {
        status: 404
    });


}