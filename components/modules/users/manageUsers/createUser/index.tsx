'use client';
// Imports
import {useEffect, useState} from 'react';
import {fetchUsers} from '@/lib/actions/users/manageUsers/user.actions';
import FormCom from '@/components/modules/users/manageUsers/createUser/FormCom';
import ViewCom from '@/components/modules/users/manageUsers/createUser/ViewCom';
import { fetchStaff } from '@/lib/actions/payroll/globalMasters/staff.actions';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
import { CurrentUser } from '@/lib/auth/session';





// Main function
export default function CreateUser ({user}:{user:CurrentUser | null}) {

    // Is view component opened
    const [isViewOpened, setIsViewOpened] = useState(false);


    // Users
    const [users, setUsers] = useState([{}]);


    // Staff
    const [staff, setStaff] = useState([{}]);


    // Schools
    const [schools, setSchools] = useState([{}]);


    // Selected schools
    const [selectedSchools, setSelectedSchools] = useState([]);


    // File
    const [file, setFile] = useState(null);


    // Image source
    const [imgSrc, setImgSrc] = useState('');


    // Update user
    const [updateUser, setUpdateUser] = useState({
        id:'',
        isDeleteClicked:false,

        name:'',
        user_name:'',
        password:'',
        is_reset_password:false,
        designation:'',
        email:'',
        employee:'',
        mobile:0,
        profile_picture:'',
        schools:[],
        is_active:false,
        enable_otp:false,
    });

    
    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const res = await fetchUsers();
            const staffRes = await fetchStaff();
            const schoolsRes = await fetchGlobalSchoolDetails();
            setUsers(res);
            setStaff(staffRes);
            setSchools(schoolsRes);
        };
        fetcher();
    }, [isViewOpened, setUpdateUser]);

    return (
        <div className='h-full flex flex-col items-center justify-start pt-10 bg-white overflow-scroll custom-sidebar-scrollbar'>
            {
                isViewOpened ? (
                    <ViewCom
                        users={users}
                        setIsViewOpened={setIsViewOpened}
                        setUpdateUser={setUpdateUser}
                        setSelectedSchools={setSelectedSchools}
                        setFile={setFile}
                        setImgSrc={setImgSrc}
                    />
                ) : (
                    <FormCom
                        user={user}
                        users={users}
                        isViewOpened={isViewOpened}
                        setIsViewOpened={setIsViewOpened}
                        updateUser={updateUser}
                        setUpdateUser={setUpdateUser}
                        staff={staff}
                        schools={schools}
                        file={file}
                        setFile={setFile}
                        imgSrc={imgSrc}
                        setImgSrc={setImgSrc}
                        selectedSchools={selectedSchools}
                        setSelectedSchools={setSelectedSchools}
                    />
                )
            }
        </div>
    );
};