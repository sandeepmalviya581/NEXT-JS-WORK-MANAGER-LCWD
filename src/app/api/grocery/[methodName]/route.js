import { connectDb } from "@/helper/db";
import { GroceryItem } from "@/model/grocery_item";
import { GroceryItemSelection } from "@/model/grocery_item_selection";
import { jwtVerify } from 'jose';
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = mongoose.Types.ObjectId;

connectDb();

export async function POST(request, { params }) {

    const { methodName } = params;
    console.log(methodName);

    if (methodName !== null & methodName !== undefined) {
        if (methodName === 'addKiranaSaman') {
            let inputData = await request.json();
            const joseToken = request.cookies.get('joseToken')?.value;
            const { payload } = await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
            const uId = payload._doc._id
            inputData.userId = uId;

            const groceryItemSelection = new GroceryItemSelection(
                inputData
            );

            try {
                let response = '';
                if (inputData._id === undefined || inputData._id === null || inputData._id === '') {
                    response = await groceryItemSelection.save();
                } else {
                    response = await groceryItemSelection.updateOne({ _id: inputData._id }, { updated_date: Date.now(), grocery_item_hindi: inputData.grocery_item_hindi, grocery_item_eng: inputData.grocery_item_eng, quantity: inputData.quantity, uom: inputData.uom });
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
        if (methodName === 'addGroceryItem') {
            let inputData = await request.json();

            const groceryItem = new GroceryItem(
                inputData
            );

            try {
                let response = await groceryItem.save();
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

        else if (methodName === 'deleteKiranaSaman') {
            let inputData = await request.json();
            try {
                let res = await GroceryItemSelection.deleteOne({ _id: inputData._id });
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

        else if (methodName === 'getAllKiranaSaman') {
            let inputData = await request.json();
            try {
                const res = await GroceryItemSelection.find({ user_id: inputData.user_id });
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

        if (methodName === 'getAllGroceryItem') {
            try {
                const res = await GroceryItem.find().sort({ grocery_item_eng: 1 });
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

    }
    return NextResponse.json({
        message: "Not found"
    }, {
        status: 404
    });


}