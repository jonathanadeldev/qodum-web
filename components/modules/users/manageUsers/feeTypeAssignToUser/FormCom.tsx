'use client';
// Imports
import {ChevronDown} from 'lucide-react';
import FeeTypesList from './FeeTypesList';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {fetchTypes} from '@/lib/actions/fees/feeMaster/feeMaster/type.actions';
import {fetchUsers, modifyUserFeeTypes} from '@/lib/actions/users/manageUsers/user.actions';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { CurrentUser } from '@/lib/auth/session';





// Main function
const FormCom = ({user}:{user:CurrentUser | null}) => {


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Errors
    const [errors, setErrors] = useState({
        user:''
    });


    // Users
    const [users, setUsers] = useState<any>([{}]);


    // Fee types
    const [feeTypes, setFeeTypes] = useState<any>([{}]);


    // Selected user
    const [selectedUser, setSelctedUser] = useState('');


    // Current user
    const [currentUser, setCurrentUser] = useState<any>({});


    // Submit handler
    const submitHandler = async () => {

        // Setting is loading to true
        setIsLoading(true);


        // Validate user and module
        if(selectedUser === ''){
            setErrors({
                user:selectedUser === '' ? 'Please select a user' : ''
            });
            setIsLoading(false);
            return;
        };


        // Updaing user's permissions
        await modifyUserFeeTypes({id:currentUser?._id, fee_types:currentUser.fee_types});


        // Reseting
        toast({title:'Fee Types Updated!'});


        // Setting is loading to false
        setIsLoading(false);

    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const usersRes = await fetchUsers();
            const feeTypesRes = await fetchTypes();
            setUsers(usersRes.filter((u:any) => !u.is_admin));
            setFeeTypes(feeTypesRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        setCurrentUser(users.find((u:any) => u.name === selectedUser));
        setIsLoading(false);
    }, [selectedUser]);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Users')?.permissions?.find((pp:any) => pp.sub_menu === 'Fee Type Assign To User');
        setPermissions(grantedPermissions);
    }, [user]);

    return (
        <div className='w-full flex flex-col items-center justify-center gap-10'>

            <div className='w-[50%] max-w-[400px] flex flex-row items-center gap-4'>

                {/* User */}
                <div className='w-full flex flex-col items-start justify-center'>
                    <Select
                        value={selectedUser}
                        onValueChange={(v:any) => {
                            setSelctedUser(v);
                            setErrors({...errors, user:''});
                        }}
                        disabled={!permissions.read_only}
                    >
                        <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                            <SelectValue placeholder='Select User'/>
                            <ChevronDown className='h-4 w-4 opacity-50'/>
                        </SelectTrigger>
                        <SelectContent>
                            {users.length < 1 ? (
                                <p>No users</p>
                            ) : !users[0]?.name ? (
                                <LoadingIcon />
                            ) : users.map((item:any) => (
                                <SelectItem value={item?.name} key={item._id}>{item?.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.user && <span className='text-[11px] text-red-500'>{errors.user}</span>}
                </div>


                {/* Buttons */}
                {permissions.modify && isLoading ? (
                    <LoadingIcon />
                ) : (
                    <span
                        onClick={submitHandler}
                        className='w-[200px] flex items-center justify-center h-8 text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        Update
                    </span>
                )}

            </div>


            {/* Permissions list */}
            {selectedUser && (
                <FeeTypesList
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    feeTypes={feeTypes}
                />
            )}

        </div>
    );
};





// Export
export default FormCom;