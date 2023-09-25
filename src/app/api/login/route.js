import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose';
import { checkEmpty } from '@/helper/utility'

import * as jose from 'jose';


connectDb();


// export async function joseSign(payload, secret) {
//     const iat = Math.floor(Date.now() / 1000);
//     const exp = iat + 60* 60; // one hour

//     return new SignJWT({...payload})
//         .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
//         .setExpirationTime(exp)
//         .setIssuedAt(iat)
//         .setNotBefore(iat)
//         .sign(new TextEncoder().encode(secret));
// }


// export async function verify(token,secret) {
//     const {payload} = await jwtVerify(token, new TextEncoder().encode(secret));
//     // run some checks on the returned payload, perhaps you expect some specific values

//     // if its all good, return it, or perhaps just return a boolean
//     return payload;
// }

export async function POST(request) {

    const { email, password } = await request.json();
    try {
        if (checkEmpty(email)) {
            throw "Email id can not be empty.";
        } else if (checkEmpty(password)) {
            throw "Password can not be empty.";
        }
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (user == null) {
            // throw new Error("User not found !!");
            throw "User not found !!"
        }

        const matched = bcrypt.compareSync(password, user.password);

        if (!matched) {
            // throw new Error("Password not matched !!");
            throw "Password not matched !!"

        }




        const secret = new TextEncoder().encode(
            'workmanager',
        )
        const alg = 'HS256'

        const newJwt = await new jose.SignJWT({ ...user })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            // .setIssuer('urn:example:issuer')
            // .setAudience('urn:example:audience')
            .setExpirationTime('1h')
            .sign(secret);


        // const authToken = jwt.sign({
        //     _id: user._id,
        //     name: user.name
        // }, 'workmanager');


        // console.log(authToken);
        user.password = null;
        const response = NextResponse.json(user);

        // response.cookies.set("authToken", authToken, {
        //     expiresIn: '1h',
        //     httpOnly: true
        // });

        response.cookies.set("joseToken", newJwt, {
            expiresIn: '1h',
            httpOnly: true
        });

        return response;
    } catch (error) {
        console.log('sandeep->', error)
        return NextResponse.json({
            message: error,
            error,
            success: false
        }
            , { status: 401 }
        );

    }
}