import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware called.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const authToken = request.cookies.get('authToken')?.value;
    console.log(authToken);

    const loginUserNotAccess = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

    if (request.nextUrl.pathname === '/api/login') {
        return;
    }
    if (loginUserNotAccess) {
        if (authToken) {
            return NextResponse.redirect(new URL('/profile/user', request.url))
        }
    } else {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/signup', '/add-task', '/profile/user', '/show-tasks', '/api/:path*']
}