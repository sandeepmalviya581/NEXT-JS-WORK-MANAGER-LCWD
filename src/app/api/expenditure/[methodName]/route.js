import { connectDb } from "@/helper/db";
import { checkEmpty, getUserIdFromToken } from "@/helper/utility";
import { Expenditure } from "@/model/expenditure";
import { Hierarchy } from "@/model/hierarchy";
import { Jira } from "@/model/jira";
import { SugarReport } from "@/model/sugar_report";
import { jwtVerify } from 'jose';
import { NextResponse } from "next/server";


connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'addExpenditure') {
            let requestModel = await request.json();
            try {
                // Validation

                const userId = await getUserIdFromToken(request);
                requestModel.created_by = userId

                const expenditure = new Expenditure(
                    requestModel
                );
                let responseDB = '';
                if (checkEmpty(requestModel._id)) {
                    responseDB = await expenditure.save();
                } else {
                    responseDB = await Expenditure.updateOne({ _id: requestModel._id }, { amount: requestModel.amount, description: requestModel.description, category: requestModel.category, updatedBy: userId, updatedDate: Date.now(), expditure_date: requestModel.expditure_date });
                }
                return NextResponse.json(
                    responseDB, {
                    status: 201
                });
            } catch (error) {
                return NextResponse.json({
                    message: "Failed to create.",
                    error
                }, {
                    status: 400
                }
                );
            }
        }


        
 if (methodName === 'addMultipleExpenditure') {
            let requestModel = await request.json();
            console.log('sandeep req model okay',requestModel);
            try {
                // Validation

                if(requestModel == null || requestModel == undefined|| (typeof requestModel === 'object' && Object.keys(requestModel).length === 0)){
                        throw `Empty request`;
                }else if (requestModel.expditureList && requestModel.expditureList.length===0){
                    throw `Exp list can not be empty.`;
                }

              const userId = await getUserIdFromToken(request);

              const todayDate  = Date.now();

                let updatedReq = requestModel.expditureList.map((item,index) => {
                     index = index+1;
                    item.created_by = userId
                    item.category = 'Other'
                    item.updatedDate = todayDate
                    console.log('ui data',item.expenditure_date);

                    if (item.expenditure_date == null || item.expenditure_date == undefined  || item.expenditure_date == '') {
                        item.expenditure_date = todayDate
                    }
                    if (checkEmpty(item.description)) {
                        // throw `Description can not be empty at index ${index}`;
                        throw new Error(`Description can not be empty at index ${index}`);
                    }
                    if (item.amount == null || item.amount === '') {
                        throw new Error(`Amount can not be empty at index ${index}`);
                    }
                    if (typeof item.amount !== 'number' || isNaN(item.amount) || item.amount < 0) {
                        throw new Error(`Amount must be a valid number and can not be zero at index ${index}`);
                    }
                    return item;
                });

                console.log('update req sandeep',updatedReq);
                let respManyExpd = await Expenditure.insertMany(updatedReq);
                console.log(respManyExpd);

                return NextResponse.json(
                    respManyExpd, {
                    status: 201
                });
            } catch (error) {
                return NextResponse.json({
                    message: "Failed to create multiple expenditures.",
                    error: error.message,
                    errorStacktrace: error.stack
                }, {
                    status: 500
                }
                );
            }
        }
        else if (methodName === 'getCalculatedExpenditure') {
            let requestModel = await request.json();
            let month = requestModel.month; // Example: null or undefined if not provided
            let year = requestModel.year;  // Example: null or undefined if not provided
            let category = requestModel.category;  // Example: null or undefined if not provided
            try {
                year = parseInt(year, 10);
                month = parseInt(month, 10);

                let stages = [
                    {
                        $addFields: {
                            year: { $year: "$expenditure_date" },
                            month: { $month: "$expenditure_date" }
                        }
                    },
                    {
                        $match: {
                            $or: [
                                { year: year },
                                { month: month }
                            ]
                        }
                    },
                    {
                        $group: {
                            _id: { year: "$year", month: "$month" },
                            totalAmount: { $sum: "$amount" },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $sort: { "_id.year": 1, "_id.month": -1 }
                    }
                ];
                // const selectedYear = parseInt(year, 10);
                // const selectedMonth = parseInt(month, 10);

                // const matchCondition = {};
                // if (selectedYear) {
                //   // Filter by year
                //   matchCondition.year = selectedYear;
                // } 
                // if (selectedMonth) {
                //   // Filter by month
                //   matchCondition.month = selectedMonth;
                // }

                // const groupFields = {};
                // if (selectedYear) {
                //   // Group by year only if a year is specified
                //   groupFields.year = "$year";
                // } else {
                //   // Group by month if a month is specified (across all years)
                //   groupFields.month = "$month";
                // }

                // let stages = [
                //     {
                //         $addFields: {
                //             year: { $year: "$expenditure_date" },
                //             month: { $month: "$expenditure_date" }
                //         }
                //     },
                //     {
                //         $match: matchCondition
                //     },
                //     {
                //         $group: {
                //             _id: groupFields,
                //             totalAmount: { $sum: "$amount" },
                //             count: { $sum: 1 }
                //         }
                //     },
                //     {
                //         $group: {
                //             _id: null,
                //             totalAmount: { $sum: "$totalAmount" },
                //             count: { $sum: "$count" }
                //         }
                //     },
                //     {
                //         $sort: { "_id.year": 1, "_id.month": 1 }
                //     }
                // ];


                // // const customPipeline = [projectStage, groupStage];
                const res = await Expenditure.aggregate(stages);
                return NextResponse.json(
                    res, {
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


        else if (methodName === 'deleteExpenditure') {
            let requestModel = await request.json();
            try {
                const responseDB = await Expenditure.deleteOne({ '_id': requestModel._id });
                console.log(responseDB);
                return NextResponse.json(
                    responseDB, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to delete.",
                    error
                }, {
                    status: 500
                }
                );
            }
        }
        else if (methodName === 'getAllExpenditure') {
            let requestModel = await request.json();
            try {
                const responseDB = await Expenditure.find({}).sort({ _id: -1 });;
                return NextResponse.json(
                    responseDB, {
                    status: 200
                });
            } catch (error) {
                console.log(error)
                return NextResponse.json({
                    message: "Failed to getAllExpenditure.",
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





