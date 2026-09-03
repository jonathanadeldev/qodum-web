'use client';
// Imports
import * as z from 'zod';
import Buttons from './Buttons';
import {deepEqual} from '@/lib/utils';
import {useForm} from 'react-hook-form';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {UserValidation} from '@/lib/validations/users/manageUsers/user.validation';
import {createUser, deleteUser, modifyUser} from '@/lib/actions/users/manageUsers/user.actions';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { uploadUserImage } from '@/lib/actions/image.actions';
import { Checkbox } from '@/components/ui/checkbox';





// Main function
const FormCom = ({user, setIsViewOpened, users, updateUser, setUpdateUser, staff, file, setFile, imgSrc, setImgSrc, schools, selectedSchools, setSelectedSchools}:any) => {

    // Toast
    const {toast} = useToast();


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Comparison object
    const comparisonObject = {
        name:updateUser.name,
        user_name:updateUser.user_name,
        password:updateUser.password,
        is_reset_password:updateUser.is_reset_password,
        designation:updateUser.designation,
        email:updateUser.email,
        employee:updateUser.employee,
        mobile:updateUser.mobile,
        profile_picture:updateUser.profile_picture,
        schools:updateUser.schools,
        is_active:updateUser.is_active,
        enable_otp:updateUser.enable_otp
    };


    // Form
    const form = useForm({
        resolver:zodResolver(UserValidation),
        defaultValues:{
            name:updateUser.id === '' ? '' : updateUser.name,
            user_name:updateUser.id === '' ? '' : updateUser.user_name,
            password:updateUser.id === '' ? '' : updateUser.password,
            is_reset_password:updateUser.id === '' ? false : updateUser.is_reset_password,
            designation:updateUser.id === '' ? '' : updateUser.designation,
            email:updateUser.id === '' ? '' : updateUser.email,
            employee:updateUser.id === '' ? '' : updateUser.employee,
            mobile:updateUser.id === '' ? 0 : updateUser.mobile,
            profile_picture:updateUser.id === '' ? '' : updateUser.profile_picture,
            schools:updateUser.id === '' ? [] : updateUser.schools,
            is_active:updateUser.id === '' ? false : updateUser.is_active,
            enable_otp:updateUser.id === '' ? false : updateUser.enable_otp
        }
    });


    // Submit handler
    const onSubmit = async (values:z.infer<typeof UserValidation>) => {

        // Setting is loading to true
        setIsLoading(true);


        // Create user
        if(updateUser.id === ''){
            if(users.map((r:any) => r.user_name).includes(values.user_name)){
                toast({title:'User already exists', variant:'error'});
                return;
            };
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadUserImage({data:formData, name:`${values.name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`});
            };
            const res = await createUser({
                name:values.name,
                user_name:values.user_name,
                password:values.password,
                is_reset_password:values.is_reset_password,
                designation:values.designation,
                email:values.email,
                employee:values.employee,
                mobile:values.mobile,
                profile_picture:file !== null ? `https://qodum.s3.amazonaws.com/users/${values.name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}` : values.profile_picture || '',
                schools:selectedSchools,
                is_active:values.is_active,
                enable_otp:values.enable_otp
            });
            toast({title:'Added Successfully!'});
        }
        // Modify user
        else if(!deepEqual(comparisonObject, values) || file || JSON.stringify(comparisonObject.schools) !== JSON.stringify(selectedSchools)){
            if(comparisonObject.user_name !== values.user_name && users.map((r:any) => r.user_name).includes(values.user_name)){
                toast({title:'User already exists', variant:'error'});
                return;
            };
            const randomNumber = Math.floor(Math.random() * 1000000) + 1;
            if(file){
                const formData = new FormData();
                formData.append('file', file);
                await uploadUserImage({data:formData, name:`${values.name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}`});
            };
            await modifyUser({
                id:updateUser.id,
                name:values.name,
                user_name:values.user_name,
                password:values.password,
                is_reset_password:values.is_reset_password,
                designation:values.designation,
                email:values.email,
                employee:values.employee,
                mobile:values.mobile,
                profile_picture:file !== null ? `https://qodum.s3.amazonaws.com/users/${values.name.toLowerCase().replace(/\s+/g, '-')}-${randomNumber}` : comparisonObject.profile_picture,
                schools:selectedSchools,
                is_active:values.is_active,
                enable_otp:values.enable_otp
            });
            toast({title:'Updated Successfully!'});
        }
        // Delete user
        else if(updateUser.isDeleteClicked){
            await deleteUser({id:updateUser.id});
            toast({title:'Deleted Successfully!'});
        };


        // Reseting update entity
        setUpdateUser({
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
        // Reseting form
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
        setFile(null);
        setImgSrc('');
        setSelectedSchools([]);


        // Setting is loading to false
        setIsLoading(false);
    };


    // Handle on change
    const handleOnChange = (e:any) => {
        setFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function(onLoadEvent) {
            // @ts-ignore
            setImgSrc(onLoadEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };


    // Use effect
    useEffect(() => {}, [form.watch('is_reset_password'), form.watch('is_active'), form.watch('enable_otp')]);

    return (
        <div className='w-[90%] max-w-[500px] mb-10 flex flex-col items-center rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Create User</h2>
            <Form
                {...form}
            >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='relative w-full flex flex-col gap-3 pt-4 items-center px-2 sm:px-4'
                >

                    {/* Profile picture */}
                    <div className='w-full flex items-center justify-start'>
                        <p className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Profile Picture</p>
                        <div className='w-[100px] h-[100px] mb-2 flex items-center justify-center bg-[#ccc] cursor-pointer rounded-[4px] transition hover:opacity-90'>
                            <label
                                // @ts-ignore
                                htmlFor='image'
                                className='flex items-center justify-center h-full w-full cursor-pointer text-xs font-semibold'
                            >
                                {imgSrc !== '' ? (
                                    <img
                                        alt="User's image"
                                        src={imgSrc}
                                        className='w-full h-full rounded-[4px]'
                                    />
                                ) : updateUser.profile_picture ? (
                                    <img
                                        alt="User's image"
                                        src={updateUser.profile_picture}
                                        className='w-full h-full rounded-[4px]'
                                    />
                                ) : (
                                    <p className='text-[10px]'>Select Image</p>
                                )}
                            </label>
                            <input
                                type='file'
                                accept='image/*'
                                name='image'
                                id='image'
                                className='hidden'
                                onChange={(e:any) => {handleOnChange(e)}}
                            />
                        </div>
                    </div>


                    {/* Name */}
                    <FormField
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* User Name */}
                    <FormField
                        control={form.control}
                        name='user_name'
                        render={({field}) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>User Name</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Password */}
                    <FormField
                        control={form.control}
                        name='password'
                        render={({field}) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Password</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Reset Password */}
                    <div className='relative w-full h-6 flex flex-col items-start justify-end space-x-2 sm:flex-row sm:items-center'>
                        <Switch
                            id='is_reset_password'
                            onCheckedChange={() => form.setValue('is_reset_password', !form.getValues().is_reset_password)}
                            checked={form.getValues().is_reset_password}
                        />
                        <Label
                            htmlFor='is_reset_password'
                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            Reset Password
                        </Label>
                    </div>


                    {/* Designation */}
                    <FormField
                        control={form.control}
                        name='designation'
                        render={({field}) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Designation</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Email */}
                    <FormField
                        control={form.control}
                        name='email'
                        render={({field}) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Email</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Employee */}
                    <FormField
                        control={form.control}
                        name='employee'
                        render={({field}) => (
                            <FormItem className='w-full mt-1'>
                                <div className='w-full flex flex-col items-start justify-center sm:flex-row sm:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-xs text-[#726E71] sm:basis-[30%]'>Employee</FormLabel>
                                    <div className='w-full flex flex-col items-start gap-4 basis-[70%]'>
                                        <FormControl>
                                            <Select
                                                {...field}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger className='h-8 w-full flex flex-row items-center text-xs pl-2 rounded-none bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'>
                                                    <SelectValue placeholder='Please select'/>
                                                    <ChevronDown className='h-4 w-4 opacity-50'/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {staff.length < 1 ? (
                                                        <p>No users</p>
                                                    ) : !staff[0]?.staff_registration?.first_name ? (
                                                        <LoadingIcon />
                                                    ) : staff.map((item:any) => (
                                                        <SelectItem value={item?.staff_registration?.first_name} key={item._id}>{item?.staff_registration?.first_name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Mobile */}
                    <FormField
                        control={form?.control}
                        name='mobile'
                        render={({ field }) => (
                            <FormItem className='relative w-full mt-2 lg:mt-0'>
                                <div className='w-full h-7 flex flex-col items-start justify-center lg:flex-row lg:items-center'>
                                    <FormLabel className='basis-auto pr-[4px] text-end text-[11px] text-[#726E71] lg:basis-[30%]'>Mobile</FormLabel>
                                    <div className='h-full w-full flex flex-col items-start gap-4 lg:basis-[70%]'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type='number'
                                                className='h-full flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] remove-arrow'
                                            />
                                        </FormControl>
                                        <FormMessage className='absolute left-[30%] top-[90%] text-[11px]'/>
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />


                    {/* Schools */}
                    <div className='w-full flex flex-row items-center'>
                        <FormLabel className='w-full text-[11px] text-end pr-[4px] text-[#726E71] lg:basis-[30%]'>Schools</FormLabel>
                        <div className='w-full h-full flex flex-row items-center justify-between gap-2 lg:basis-[70%]'>
                            <FormItem className='flex-1 flex flex-col items-start justify-center mt-2 lg:flex-row lg:items-center lg:gap-0 lg:mt-0'>
                                <FormControl>
                                    <Select>
                                        <SelectTrigger className='w-full h-7 flex flex-row items-center text-[11px] pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] rounded-none'>
                                            <SelectValue placeholder={selectedSchools?.length < 1 ? 'Please Select' : selectedSchools?.length === 1 ? '1 school selected' : `${selectedSchools?.length} schools selected`} />
                                            <ChevronDown className="h-4 w-4 opacity-50" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schools.length < 1 ? (
                                                <p>No schools</p>
                                            ) : // @ts-ignore
                                            !schools[0]?.school_name ? (
                                                <LoadingIcon />
                                            ) : (
                                                <>
                                                    <div className='flex flex-row'>
                                                        <div
                                                            // @ts-ignore
                                                            onClick={() => setSelectedSchools(schools.map((s:any) => s.school_name))}
                                                            className='group flex flex-row items-center justify-center cursor-pointer'
                                                        >
                                                            <Check size={12}/>
                                                            <p className='text-xs group-hover:underline'>All</p>
                                                        </div>
                                                        <div
                                                            onClick={() => setSelectedSchools([])}
                                                            className='group flex flex-row items-center justify-center ml-2 cursor-pointer'
                                                        >
                                                            <X size={12}/>
                                                            <p className='text-xs group-hover:underline'>Clear</p>
                                                        </div>
                                                    </div>
                                                    <ul className='mt-2'>
                                                        {schools.map((school:any) => (
                                                            <li className='flex flex-row items-center space-x-[2px] mt-[2px]' key={school._id}>
                                                                <Checkbox
                                                                    className='rounded-[3px] text-hash-color font-semibold'
                                                                    checked={selectedSchools?.map((s:any) => s).includes(school.school_name)}
                                                                    // @ts-ignore
                                                                    onClick={() => selectedSchools?.includes(school.school_name) ? setSelectedSchools(selectedSchools?.filter((s:any) => s !== school.school_name)) : setSelectedSchools([...selectedSchools, school.school_name])}
                                                                />
                                                                <div className='w-full flex flex-row'>
                                                                    <p className='basis-[70%] text-[11px]'>{school.school_name}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        </div>
                    </div>


                    {/* Is Active */}
                    <div className='relative w-full h-6 flex flex-col items-start justify-end space-x-2 sm:flex-row sm:items-center'>
                        <Switch
                            id='is_active'
                            onCheckedChange={() => form.setValue('is_active', !form.getValues().is_active)}
                            checked={form.getValues().is_active}
                        />
                        <Label
                            htmlFor='is_active'
                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            Is Active
                        </Label>
                    </div>


                    {/* Enable OTP */}
                    <div className='relative w-full h-6 flex flex-col items-start justify-end space-x-2 sm:flex-row sm:items-center'>
                        <Switch
                            id='enable_otp'
                            onCheckedChange={() => form.setValue('enable_otp', !form.getValues().enable_otp)}
                            checked={form.getValues().enable_otp}
                        />
                        <Label
                            htmlFor='enable_otp'
                            className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            Enable OTP
                        </Label>
                    </div>


                    {/* Buttons */}
                    {isLoading ? (
                        <LoadingIcon />
                    ) : (
                        <Buttons user={user} setIsViewOpened={setIsViewOpened} users={users} updateUser={updateUser} setUpdateUser={setUpdateUser} onSubmit={onSubmit} form={form} setFile={setFile} setImgSrc={setImgSrc} setSelectedSchools={setSelectedSchools}/>
                    )}

                </form>
            </Form>
        </div>
    );
};





// Export
export default FormCom;