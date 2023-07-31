import { User } from '@/model/user';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function GET(request) {
    const authToken = request.cookies.get('authToken')?.value;
    const data = jwt.verify(authToken, 'workmanager');

    // const user = await User.findById(data._id);

    return NextResponse.json(data);

}