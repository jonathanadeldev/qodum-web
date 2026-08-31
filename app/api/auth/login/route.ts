'use server'
import bcrypt from 'bcryptjs';
import User from "@/lib/models/users/manageUsers/User.model";
import { connectToDb } from "@/lib/mongoose";
import { loginSchema } from "@/lib/validations/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { signToken } from '@/lib/auth/jwt';
import { setAuthCookie } from '@/lib/auth/session';


function buildModulePermissions(
  permissions: Array<{ name: string; permissions: any[] }> = []
) {
  const map = {
    admission: false,
    fees: false,
    attendance: false,
    payroll: false,
    marksEntry: false,
    examinations: false,
    timeTable: false,
    accounts: false,
    stocks: false,
    library: false,
    users: false,
    qodumCare: false,
  }

  for (const group of permissions) {
    const key = group.name.toLowerCase()

    const normalizedKey =
      key === 'marks entry' ? 'marksEntry' :
      key === 'time table' ? 'timeTable' :
      key === 'qodum care' ? 'qodumCare' :
      key

    if (normalizedKey in map) {
      map[normalizedKey as keyof typeof map] =
        group.permissions.some((item) =>
          Object.values(item).some(
            (value) => typeof value === 'boolean' && value === true
          )
        )
    }
  }

  return map
}


export async function POST(request: NextRequest) {
    try{
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
    
        const user = await (User as any).findOne({ user_name: username })

        if (!user) {
          return NextResponse.json(
            { error: 'Invalid username or password' },
            { status: 401 }
          )
        }
    
        const match = bcrypt.compareSync(password, user.password);
    
        if (!match) {
          return NextResponse.json(
            { error: 'Invalid username or password' },
            { status: 401 }
          )
        }
    
        console.log({
          userId: user._id.toString(),
          username: user.user_name,
          isAdmin: user.is_admin,
          permissions: buildModulePermissions(user.permissions)
        });
        const token = await signToken({
            userId: user._id.toString(),
            username: user.user_name,
            isAdmin: user.is_admin,
            permissions: buildModulePermissions(user.permissions)
        })
        await setAuthCookie(token);
    
        return NextResponse.json(
            { userId: user._id.toString(), username: user.user_name, isAdmin: user.is_admin, permissions: buildModulePermissions(user.permissions) },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json({ error: 'Log in: Something went wrong' }, { status: 500 })
    }
}