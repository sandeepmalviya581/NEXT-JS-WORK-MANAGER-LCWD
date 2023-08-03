import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("========middleware start.========");
    const authToken = request.cookies.get('authToken')?.value;
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
        if (authToken) {
            console.log("middleware :: AuthToken have value and went to Home page.");
            return NextResponse.redirect(new URL('/profile/user', request.url))
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
        }
    }
    console.log("========middleware end.========");

    //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/signup', '/add-task', '/profile/user', '/show-tasks', '/api/:path*']
}