import { User } from '@/model/user';
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export async function GET(request) {
        console.log('staring current api');

    // if (request.cookies.get('authToken')) {
    //     const authToken = request.cookies.get('authToken')?.value;
    //     const data = await jwt.verify(authToken, 'workmanager');

    //     console.log('data in current api');
    //     console.log(data);
    //     // const user = await User.findById(data._id);
    //     // console.log('data in user api called agined api');
    //     // console.log(user);
    //     console.log('end inside side current api');
    //     return NextResponse.json(data);

    //     // return NextResponse.json(user);
    // }
    console.log('end out side current api');

    const user={
        _id: '64ec2f51be2d8397def321ca',
        name: 'Sandeep Malviya'
    }

    return NextResponse.json(user);

}