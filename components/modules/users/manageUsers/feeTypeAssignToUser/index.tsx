'use client';
import { CurrentUser } from '@/lib/auth/session';
import FormCom from './FormCom';


export default function FeeTypeAssignToUser({user}:{user:CurrentUser | null}){
    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-scroll custom-sidebar-scrollbar'>
            <FormCom user={user}/>
        </div>
    );
};