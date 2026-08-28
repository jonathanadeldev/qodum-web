'use server'
import bcrypt from 'bcryptjs';
import User from "@/lib/models/users/manageUsers/User.model";
import { connectToDb } from "@/lib/mongoose";
import { loginSchema } from "@/lib/validations/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {

    connectToDb('accounts')

    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
        return NextResponse.json(
            { error: result.error.flatten().fieldErrors },
            { status: 400 }
        )
    }

    const { username, password } = result.data

    const user = await (User as any).findOne({ username })

    const match = bcrypt.compareSync(password, user.password);

    if (!user || !match) {
        return NextResponse.json(
            { error: 'Invalid username or password' },
            { status: 401 }
        )
    }

}