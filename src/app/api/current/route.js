import { User } from '@/model/user';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function GET(request) {

    if (request.cookies.get('authToken')) {
        const authToken = request.cookies.get('authToken')?.value;
        const data = jwt.verify(authToken, 'workmanager');
        console.log('data in current api');
        console.log(data);
        // const user = await User.findById(data._id);
        // console.log('data in user api called agined api');
        // console.log(user);
        return NextResponse.json(data);

        // return NextResponse.json(user);
    }

    return NextResponse.json({});

}