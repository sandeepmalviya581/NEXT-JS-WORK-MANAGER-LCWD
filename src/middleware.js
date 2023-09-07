import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    console.log("========middleware start.========");
    const authToken = request.cookies.get('authToken')?.value;
    const joseToken = request.cookies.get('joseToken')?.value;

    console.log("middleware :: AuthToken.");
    console.log(authToken);
    console.log("middleware :: Tring to call page.", request.nextUrl.pathname);
    const loginUserNotAccess = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

    if (request.nextUrl.pathname === '/api/login' || request.nextUrl.pathname === '/api/users') {
        console.log("middleware :: Calling login and signup");
        return;
    }
    if (loginUserNotAccess) {
        console.log("middleware :: Trying to access pages-: login and signup");
        // if (authToken) {
        //     console.log("middleware :: AuthToken have value and went to Home page.");
        //     return NextResponse.redirect(new URL('/', request.url))
        // }
        if (joseToken) {
            console.log('payload->>>>>>>>>>>start');
            try {
                await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
                console.log('Sucess in validating token');
            } catch (error) {
                console.log('Failed in validating token');
                console.log(error);
                // return NextResponse.redirect(new URL('/login', request.url))
                const response= NextResponse.redirect(new URL('/login', request.url));
                response.cookies.set("joseToken", "", {
                    expiresIn: new Date(0),
                });

                response.cookies.set("authToken", "", {
                    expiresIn: new Date(0),
                });
                console.log('payload->>>>>>>>>>>end');
                return response;
            }


            console.log("middleware :: AuthToken have value and went to Home page.");
            return NextResponse.redirect(new URL('/', request.url))
        }

    } else {
        if (!authToken) {
            console.log("middleware :: Dont have login token rediect to Login page.");

            if (request.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json({
                    message: 'Access denied',
                    sucess: false
                }, {
                    status: 401
                })
            }

            return NextResponse.redirect(new URL('/login', request.url))
        } else {
            console.log('payload->>>>>>>>>>>start');
            try {
                await jwtVerify(joseToken, new TextEncoder().encode('workmanager'));
                console.log('Sucess in validating token');
            } catch (error) {
                console.log('Failed in validating token');
                console.log(error);
                // return NextResponse.redirect(new URL('/login', request.url))
                const response= NextResponse.redirect(new URL('/login', request.url));
                response.cookies.set("joseToken", "", {
                    expiresIn: new Date(0),
                });

                response.cookies.set("authToken", "", {
                    expiresIn: new Date(0),
                });
            
                return response;

            }
            console.log('payload->>>>>>>>>>>end');

        }
    }
    console.log("========middleware end.========");

    //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/signup', '/add-task', '/profile/user', '/show-tasks', '/api/:path*']
}