'use client';
// Imports
import Image from 'next/image';
import {redirect, useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import QodumLogo from '@/public/assets/logo.png';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import WelcomeImage from '@/public/assets/auth img.svg';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {Lock, LogIn, PersonStanding, User} from 'lucide-react';
import {createUser, loginUser} from '@/lib/actions/users/manageUsers/user.actions';
import { createAdmissionStates, fetchAdmissionStates } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import { fetchAcademicYears } from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';
import { AuthContext } from '@/context/AuthContext';





// Sign in
const SignIn = () => {

    // Toast
    const {toast} = useToast();


    // Router
    const router = useRouter();


    // Login user check
    const {login} = useContext(AuthContext);


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Errors
    const [errors, setErrors] = useState({
        username:'',
        password:''
    });


    // Username
    const [username, setUsername] = useState('');


    // Password
    const [password, setPassword] = useState('');


    // Focused input
    const [focusedInput, setFocusedInput] = useState('');


    // Background colors
    const backgrounds = [
        '/assets/Slides/SlideOne.png',
        '/assets/Slides/SlideTwo.png',
        '/assets/Slides/SlideThree.png',
    ];
    const [currentBackground, setCurrentBackground] = useState(0);


    // Submit handler
    const submitHandler = async () => {

        // Set loading to true
        setIsLoading(true);


        // Create admin
        // const createUserRes = await createUser({
        //     name:'superadmin',
        //     user_name:'superadmin',
        //     password:'Cmn1nf@ct',
        //     is_reset_password:true,
        //     designation:'Designataion',
        //     email:'admin@admin.com',
        //     employee:'',
        //     mobile:1234567891,
        //     profile_picture:'https://www.unitedagents.co.uk/sites/default/files/thumbnails/image/guybolton-photo-deadline.jpg',
        //     schools:[''],
        //     is_active:true,
        //     enable_otp:true
        // });
        // const academicYears = await fetchAcademicYears();


        // Create admission states
        const existingAdmissionStates = await fetchAdmissionStates();
        if(!existingAdmissionStates){
            await createAdmissionStates();
        };


        // Username and password validations
        if(username === '' || password === ''){
            setErrors({
                username:username === '' ? 'Please enter username' : '',
                password:password === '' ? 'Please enter password' : ''
            });
            setIsLoading(false);
            return;
        };


        // User login
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json()

        login(data);

        if (!res.ok) {
            if (data.error && typeof data.error === 'object') {
                Object.entries(data.error).forEach(([field, messages]) => {
                    // error
                })
            } else {
                toast({title:'Something went wrong', variant:'error'})
            }
            return
        }
        toast({title:'Logged in'});

        router.push('/');


        // Set loading to true
        setIsLoading(false);

    };


    // Use effects
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className='flex justify-center h-screen w-screen pt-20'
            style={{
                backgroundImage:`url(${backgrounds[currentBackground]})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                transition:'background 1s ease-out'
            }}
        >
            {/* Overlay */}
            <div
                className='absolute inset-0 bg-black opacity-50 pointer-events-none'
                style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(3px)',
                }}
            />
            <div className='w-[60%] h-[80%] flex flex-row items-center rounded-[10px] bg-[#F0F6FB] backdrop-blur-lg'>

                {/* Image */}
                <div
                    className='h-[110%] relative flex-1 border-r-[0.5px] border-[#ccc] rounded-[10px]'
                    style={{
                        backgroundImage:`url('/assets/Slides/WelcomeBackground.png')`,
                        backgroundSize:'cover',
                        backgroundPosition:'center',
                        transition:'background 1s ease-in-out'
                    }}
                >
                    <div className='h-full flex flex-col justify-center items-center gap-2 rounded-[10px] backdrop-blur-sm'>
                        <div className='relative'>
                            <p className='text-[35px] text-white cursor-pointer'>WELCOME TO</p>
                            <p className='bottom-0 absolute w-[150px] border-b-[2px] border-[#fff] text-[#fff] h-[13.387px]'>-</p>
                        </div>
                        <div className='w-full flex justify-center'>
                            <Image
                                width={250}
                                height={250}
                                src={QodumLogo}
                                alt='Qodum logo'
                            />
                        </div>
                    </div>
                </div>


                {/* Form */}
                <div className='flex-1 flex flex-col gap-6 pt-10 px-20'>

                    {/* Sign in heading */}
                    <h2 className='text-2xl font-semibold mt-6'>Sign in to your account</h2>


                    {/* Welcom paragraph */}
                    <p className='text-sm text-hash-color'>Welcom back! Please enter your username and password.</p>


                    {/* Username */}
                    <div className={`relative flex flex-row items-center pl-3 bg-[#fff] border-[0.5px] ${focusedInput === 'username' ? 'border-[#4CA7DE]' : 'border-[#E4E4E4]'} rounded-full transition-all`}>
                        <User
                            size={25}
                            className='text-hash-color'
                        />
                        <Input
                            value={username}
                            onChange={(e:any) => {
                                setUsername(e.target.value);
                                setErrors({...errors, username:''});
                            }}
                            onClick={() => setFocusedInput('username')}
                            onBlur={() => setFocusedInput('')}
                            placeholder='Username'
                            className='text-xs pl-3 bg-[#fff] border-[0.5px] border-[#fff] rounded-full placeholder:text-hash-color'
                        />
                        {errors.username && <p className='absolute bottom-[-15px] left-0 text-xs text-red-600'>{errors.username}</p>}
                    </div>


                    {/* Password */}
                    <div className={`relative flex flex-row items-center pl-3 bg-[#fff] border-[0.5px] ${focusedInput === 'password' ? 'border-[#4CA7DE]' : 'border-[#E4E4E4]'} rounded-full transition-all`}>
                        <Lock
                            size={25}
                            className='text-hash-color'
                        />
                        <Input
                            type='password'
                            value={password}
                            onChange={(e:any) => {
                                setPassword(e.target.value);
                                setErrors({...errors, password:''});
                            }}
                            placeholder='Password'
                            onClick={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput('')}
                            className='text-xs pl-3 bg-[#fff] border-[0.5px] border-[#fff] rounded-full placeholder:text-hash-color'
                        />
                        {errors.password && <p className='absolute bottom-[-15px] left-0 text-xs text-red-600'>{errors.password}</p>}
                    </div>


                    {/* Login */}
                    <span
                        onClick={submitHandler}
                        className='flex items-center justify-center px-4 h-10 mt-8 text-lg text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-white cursor-pointer
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                    >
                        {isLoading ? (
                            <LoadingIcon />
                        ) : (
                            <>
                                <LogIn size={25} className='mr-2'/>
                                Login
                            </>
                        )}
                    </span>

                </div>

            </div>
        </div>
    );
};





// Export
export default SignIn;