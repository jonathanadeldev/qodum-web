// components/modules/users/manageUsers/createUser/Buttons.tsx
'use client';
// Imports
import Link from 'next/link';
import PrintButton from './PrintButton';
import {Button} from '@/components/ui/button';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useFieldState, usePageStateStore } from '@/store/pageStateStore';
import { getTabPath } from '@/components/utils/breadcrumb';
import { emptyUser } from '@/constants/emptyUser';

// Main Function
const Buttons = ({user, users, editingUser, onSubmit, form}:any) => {

    const pathname = usePathname();
    const tabPath = getTabPath(pathname);
    const clearPage = usePageStateStore((s) => s.clearPage);
    const [, setEditingUser] = useFieldState('editingUser', emptyUser, tabPath);

    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });

    // Cancel click
    const cancelClick = () => {
        clearPage(tabPath);
        form.reset({
            name:'',
            user_name:'',
            password:'',
            is_reset_password:false,
            designation:'',
            email:'',
            employee:'',
            mobile:0,
            profile_picture:'',
            schools:'',
            is_active:false,
            enable_otp:false,
        });
    };

    // Handle submit
    const handleSubmit = () => form.handleSubmit(onSubmit)();

    // Use effect
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Users')?.permissions?.find((pp:any) => pp.sub_menu === 'Create User');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='flex flex-row items-center justify-center pb-4 mt-10 gap-2 ml-0'>
            {
                editingUser.id === '' ? permissions.add && (
                    <Button
                        type='submit'
                        className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-[16px] sm:px-4'
                    >
                        Save
                    </Button>
                ) : (
                    <>

                        {/* Modify button */}
                        {permissions.modify && (
                            <AlertDialog>
                                <AlertDialogTrigger
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#790AE0] to-[#8f3cdd] rounded-full transition border-[1px] border-white
                                    hover:border-[#790AE0] hover:from-[#8f3cdd40] hover:to-[#8f3cdd40] hover:text-[#790AE0] sm:text-[16px] sm:px-4'
                                >
                                    Modify
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want  to modify this record?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>No</AlertDialogCancel>
                                        <AlertDialogAction>
                                            <Button
                                                className='border-[0.5px] border-black'
                                                onClick={handleSubmit}
                                            >
                                                Yes
                                            </Button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}

                        {/* Delete button */}
                        {permissions.delete && (
                            <AlertDialog>
                                <AlertDialogTrigger
                                    className='px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#ba2b2b] to-[#b95e5e] rounded-full transition border-[1px] border-white
                                    hover:border-[#ba2b2b] hover:from-[#ba2b2b42] hover:to-[#ba2b2b42] hover:text-[#ba2b2b] sm:text-[16px] sm:px-4'
                                    onClick={() => setEditingUser({...editingUser, isDeleteClicked:true})}
                                >
                                    Delete
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want  to delete this record?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            onClick={() => setEditingUser({...editingUser, isDeleteClicked:false})}
                                        >
                                            No
                                        </AlertDialogCancel>
                                        <Button
                                            className='border-[0.5px] border-black'
                                            onClick={handleSubmit}
                                        >
                                            Yes
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </>
                )
            }

            {/* View button */}
            {permissions.read_only && (
                <Link
                    href={`${tabPath}/view`}
                    className='flex items-center px-[8px] h-8 text-xs text-white bg-gradient-to-r from-[#51B272] to-[#94E7B1] rounded-full transition border-[1px] border-white cursor-pointer
                            hover:border-[#51B272] hover:from-[#5cbb7d21] hover:to-[#5cbb7d21] hover:text-[#51B272] sm:text-[16px] sm:px-4'
                >
                    View
                </Link>
            )}

            {/* Print button */}
            {permissions.print && (
                <PrintButton users={users}/>
            )}

            {/* Cancel button */}
            <span
                className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#C7C8CA] to-[#EAEDF0] rounded-full transition border-[1px] border-white cursor-pointer
                        hover:border-[#a3a3a3] hover:from-[#c8c9cb26] hover:to-[#c8c9cb26] hover:text-hash-color sm:text-[16px] sm:px-4'
                onClick={cancelClick}
            >
                Cancel
            </span>

        </div>
    );
};

export default Buttons;