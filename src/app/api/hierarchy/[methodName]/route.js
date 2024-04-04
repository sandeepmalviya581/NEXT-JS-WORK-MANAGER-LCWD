import { connectDb } from "@/helper/db";
import { getUserIdFromToken } from "@/helper/utility";
import { Hierarchy } from "@/model/hierarchy";
import { Jira } from "@/model/jira";
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";

connectDb();

function getMaxDepth(obj) {
    if (!obj || !obj.hierarchyList || obj.hierarchyList.length === 0) {
        return 1;
    }

    let maxDepth = 0;
    for (const child of obj.hierarchyList) {
        const depth = getMaxDepth(child);
        maxDepth = Math.max(maxDepth, depth);
    }
    return maxDepth + 1;
}

function findById(obj, targetId) {
    if (obj._id === targetId) {
        return obj;
    }

    if (obj.hierarchyList) {
        for (const child of obj.hierarchyList) {
            const result = findById(child, targetId);
            if (result) {
                return result;
            }
        }
    }

    return null;
}

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'createHierarchy') {
            let requestModel = await request.json();
            console.log(requestModel);
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const data = payload;
            requestModel.userId = data._doc._id
            try {
                const hierarchy = new Hierarchy(
                    requestModel
                );
                let responseDB = await hierarchy.save();
                return NextResponse.json(
                    responseDB, {
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
        else if (methodName === 'getHierarchy') {
            let requestModel = await request.json();
            // const userId = await getUserIdFromToken(request);
            // console.log('useri d from uiti', userId);
            try {
                let responseDB = await Hierarchy.find();

                for (let index = 0; index < responseDB.length; index++) {
                    const element = responseDB[index];
                    // console.log(getMaxDepth(element));

                    const targetId = "65fd486c38531aa3d4258bdf";
                    console.log(findById(element, targetId));
                }

           



                return NextResponse.json(
                    responseDB, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to get.",
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




export async function GET(request, { params }) {

    const { methodName, jiraNo } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {

        if (methodName === 'getAllJiraTask') {
            try {
                const jiraResp = await Jira.find();

                const taskStatus = {
                    backlog: {
                        name: "Backlog",
                        items: [],
                    },
                    blocked: {
                        name: "Blocked",
                        items: [],
                    },
                    inProgress: {
                        name: "In Progress",
                        items: [],
                    },
                    codeReview: {
                        name: "Code Review",
                        items: [],
                    },
                    testing: {
                        name: "Testing",
                        items: [],
                    },
                    done: {
                        name: "Done",
                        items: [],
                    },
                };


                if (jiraResp != null && jiraResp.length > 0) {

                    jiraResp.forEach((element) => {
                        for (const key in taskStatus) {
                            if (element.status === key) {
                                const obj = {
                                    id: element._id,
                                    content: element.summary,
                                    jiraNo: element.jiraNo,
                                    element
                                };
                                // let obj = element;
                                // obj = {
                                //     id: element._id,
                                //     content: element.summary
                                // }

                                if (key === "backlog") {
                                    taskStatus.backlog.items.push(obj);
                                } else if (key === "blocked") {
                                    taskStatus.blocked.items.push(obj);

                                } else if (key === "inProgress") {
                                    taskStatus.inProgress.items.push(obj);

                                } else if (key === "codeReview") {
                                    taskStatus.codeReview.items.push(obj);

                                } else if (key === "testing") {
                                    taskStatus.testing.items.push(obj);

                                } else if (key === "done") {
                                    taskStatus.done.items.push(obj);
                                }

                            }
                        }
                    });

                }

                // console.log(taskStatus);

                return NextResponse.json(
                    taskStatus, {
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