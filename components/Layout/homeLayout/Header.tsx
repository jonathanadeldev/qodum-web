'use client';

// Imports
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {LogOut, Menu, Bell} from 'lucide-react';


// Main function
const HomeTopbar = ({isSidebarOpened, setIsSidebarOpened, user}:any) => {

    const router = useRouter();


    const [today, setToday] = useState('');
    const [currentTime, setCurrentTime] = useState('--:--:--');

    useEffect(() => {
        const updateDateTime = () => {
            const date = new Date();
            setToday(moment(date).format('ddd, DD MMM Y'));
            setCurrentTime(moment(date).format('HH:mm:ss'));
        };

        updateDateTime();
        const interval = window.setInterval(updateDateTime, 1000);
        return () => window.clearInterval(interval);
    }, []);


    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });

            if (!response.ok) throw new Error("Logout failed");

            router.replace("/");
            router.refresh();

        } catch {

        }
    }


    return (
        <nav className='flex min-h-[104px] flex-row items-center justify-between rounded-[16px] border border-[#E2E9F2] bg-white px-5 py-4 shadow-[0_3px_16px_rgba(30,55,90,0.04)] md:px-7'>

            {/* Date & Time */}
            <div className='flex flex-col items-start'>

                <p className='mb-1 text-sm font-medium tracking-[0.1px] text-[#5392C6]'>
                    {today}
                </p>

                <div className='flex items-baseline'>
                    <time className='text-[30px] font-semibold tracking-[-0.5px] text-[#17233C] md:text-[36px]'>
                        {currentTime}
                    </time>

                    <span className='ml-2 text-xs font-medium text-[#7B8798] md:text-sm'>
                        Local Time
                    </span>
                </div>

            </div>


            {/* Right Side */}
            <div className='flex flex-row items-center gap-3 md:gap-5'>

                {/* Notifications */}
                <button
                    type='button'
                    className='hidden h-10 w-10 items-center justify-center rounded-full border border-[#E2E7EF] bg-white text-[#52627A] transition hover:border-[#C9D8E8] hover:bg-[#F5F9FD] hover:text-[#2CABE3] md:flex'
                >
                    <Bell size={19} strokeWidth={1.8}/>
                </button>


                {/* User */}
                <div className='flex flex-row items-center gap-3'>

                    <div className='hidden flex-col items-end sm:flex'>

                        <p className='max-w-[180px] truncate text-sm font-semibold text-[#17233C]'>
                            {user?.name}
                        </p>

                        <p className='mt-0.5 max-w-[180px] truncate text-xs text-[#7B8798]'>
                            {user?.designation}
                        </p>

                    </div>


                    {/* Profile Picture */}
                    {user?.profilePicture ? (

                        <img
                            src={user?.profilePicture}
                            alt='User profile picture'
                            className='h-[52px] w-[52px] rounded-full border border-[#DCE5EE] object-cover'
                        />

                    ) : (

                        <div className='flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#DCE5EE] bg-[#F4F7FA] text-[10px] text-[#7B8798]'>
                            No photo
                        </div>

                    )}


                    {/* Logout */}
                    <button
                        type='button'
                        onClick={() => handleLogout()}
                        className='hidden h-9 w-9 items-center justify-center rounded-full border border-[#DCE2E9] bg-white text-[#718096] transition hover:border-[#2CABE3] hover:bg-[#F2F9FD] hover:text-[#2CABE3] lg:flex'
                        aria-label='Logout'
                    >
                        <LogOut size={16}/>
                    </button>

                </div>

                {/* Mobile Menu */}
                <button
                    type='button'
                    className='flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE2E9] bg-white text-[#52627A] transition hover:border-[#2CABE3] hover:text-[#2CABE3] md:hidden'
                    onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    aria-label='Open menu'
                >
                    <Menu size={18}/>
                </button>
            </div>
        </nav>
    );
};


// Export
export default HomeTopbar;