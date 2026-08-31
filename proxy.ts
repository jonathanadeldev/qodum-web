import { NextRequest, NextResponse } from 'next/server'
import { JWTPayload, jwtVerify } from 'jose'

const COOKIE_NAME = 'qodum_session'

export type Token = JWTPayload & {
    userId: string
    username: string,
    isAdmin: boolean,
    permissions: {
        admission: boolean
        fees: boolean
        attendance: boolean,
        payroll: boolean,
        marksEntry: boolean,
        examinations: boolean,
        timeTable:  boolean,
        accounts: boolean,
        stocks: boolean,
        library: boolean,
        users: boolean,
        qodumCare: boolean
    }
}

export const ROUTE_PERMISSIONS: Record<string, keyof Token['permissions']> = {
    '/admission': 'admission',
    '/fees': 'fees',
    '/attendance': 'attendance',
    '/payroll': 'payroll',
    '/marks-entry': 'marksEntry',
    '/examinations': 'examinations',
    '/time-table': 'timeTable',
    '/accounts': 'accounts',
    '/stocks': 'stocks',
    '/library': 'library',
    '/users': 'users',
    '/qodum-care': 'qodumCare'
}

async function verifySessionToken(request: NextRequest) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) return null

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        )
        return payload as Token;
    } catch {
        return null
    }
}

export async function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const user = await verifySessionToken(request)
    const routeKey = Object.keys(ROUTE_PERMISSIONS).find(prefix => path.startsWith(prefix))


    if (!user && path !== '/sign-in') {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    };

    if(user && path === '/sign-in') {
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    if (routeKey && !user.isAdmin && !user.permissions?.[ROUTE_PERMISSIONS[routeKey]]) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/sign-in', '/admission', '/fees', '/attendance', '/payroll', '/marks-entry', '/examinations', '/time-table', '/accounts', '/stocks', '/library', '/users', '/qodum-care'],
}