import { cookies } from 'next/headers'
import { connectToDb } from "@/lib/mongoose";
import { verifyToken } from './jwt'
import { JWTPayload } from 'jose'
import User from '../models/users/manageUsers/User.model';

const COOKIE_NAME = 'qodum_session'

export type CurrentUser = {
    id: string
    session: string
    name: string
    username: string
    designation: string
    email: string
    employee: string
    mobile: number
    profilePicture: string
    isActive: boolean
    permissions: {
        name: string
        permissions: {
            sr_no: number
            main_menu: string
            sub_menu: string
            add: boolean
            modify: boolean
            delete: boolean
            print: boolean
            read_only: boolean
        }[]
    }[]
    isAdmin: boolean
}

export async function setAuthCookie(token: string) {
    const store = await cookies()
    store.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30
    })
}

export async function getUserFromCookie(): Promise<JWTPayload | null> {
    const store = await cookies()
    const token = store.get(COOKIE_NAME)?.value
    if (!token) return null
    return verifyToken(token)
}

export async function clearAuthCookie() {
    const store = await cookies()
    store.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
    try{

        connectToDb('accounts');
        const payload = await getUserFromCookie()
        if (!payload || typeof payload.userId !== 'string') return null
    
        const user = await User
            .findById(payload.userId)
            .select('-password -is_reset_password -schools -fee_types -createdAt -updatedAt -__v')
            .lean() as any;
    
        if (!user) return null
    
        return {
            id: user._id.toString(),
            session: user.session,
            name: user.name,
            username: user.user_name,
            designation: user.designation,
            email: user.email,
            employee: user.employee,
            mobile: user.mobile,
            profilePicture: user.profile_picture,
            isActive: user.is_active,
            permissions: user.permissions,
            isAdmin: user.is_admin
        }

    } catch (error) {
        return null;
    }
}