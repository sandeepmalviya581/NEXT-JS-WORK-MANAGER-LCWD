import { connectDb } from "@/helper/db";
import { checkEmpty, getUserIdFromToken } from "@/helper/utility";
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
        if (methodName === 'measureSugarLevel') {
            let requestModel = await request.json();
            try {
                // Validation
                if (checkEmpty(requestModel.name)) {
                    throw "Name can not be empty.";
                }
                else if (requestModel.level == null || requestModel.level.trim() == "") {
                    throw "Level can not be empty.";
                }
                else if (requestModel.level <= 0) {
                    throw "Level can not be 0 or Negative.";
                } else if (checkEmpty(requestModel.stage)) {
                    throw "Stage can not be empty.";
                }
                const userId = await getUserIdFromToken(request);
                requestModel.createdBy = userId

                const sugarReport = new SugarReport(
                    requestModel
                );
                let responseDB = '';
                if (checkEmpty(requestModel._id)) {
                    responseDB = await sugarReport.save();
                } else {
                    responseDB = await SugarReport.updateOne({ _id: requestModel._id }, { name: requestModel.name, level: requestModel.level, stage: requestModel.stage, updatedBy: userId, updatedDate: Date.now() });
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
        else if (methodName === 'getSugarReport') {
            let requestModel = await request.json();

            try {
                let responseDB = [];
                if (checkEmpty(requestModel.search)) {
                    responseDB = await SugarReport.find().sort({ _id: -1 });
                } else {
                    responseDB = await SugarReport.find({ name: requestModel.search }).sort({ _id: -1 });
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

        else if (methodName === 'getSugarReportId') {
            let requestModel = await request.json();
            try {
                const responseDB = await SugarReport.findById(requestModel._id);
                console.log(responseDB);
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

        else if (methodName === 'deleteSugarReportId') {
            let requestModel = await request.json();
            try {

                const responseDB = await SugarReport.deleteOne({ '_id': requestModel._id });
                console.log(responseDB);
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





