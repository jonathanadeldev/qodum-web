'use client';

// Imports
import moment from 'moment';
import Clock from 'react-live-clock';
import {useRouter} from 'next/navigation';
import {LogOut, Menu} from 'lucide-react';

// Main function
const HomeTopbar = ({isSidebarOpened, setIsSidebarOpened, user}:any) => {
    const router = useRouter();


    // Today's Date
    const date = new Date();
    const today = moment(date).format('ddd, DD MMM Y');


    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" })
            if (!response.ok) throw new Error("Logout failed")
            router.replace("/")
            router.refresh()
        } catch {

        }
    }

    return (
        <nav className='flex flex-row justify-between items-center bg-white rounded-[8px] mt-4 mx-4 py-2 px-6'>
            <div className='flex flex-col items-center'>
                <p className='text-[#5392C6] text-sm mb-2'>{today}</p>
                <Clock format={'HH:mm:ss'} ticking={true} className='text-4xl'/>
            </div>
            <div className='flex flex-row gap-2'>
                <div className='flex flex-col justify-center items-end'>
                    <p className='h-5 text-md text-semibold text-hash-color'>{user?.name}</p>
                    <p className='text-xs text-hash-color'>{user?.designation}</p>
                    <span
                        onClick={() => handleLogout()}
                        className='flex justify-center items-center border-2 border-[#ccc] w-7 h-7 rounded-full cursor-pointer hover:scale-105 transition-transform'
                    >
                        <LogOut className='text-hash-color' size={15}/>
                    </span>
                </div>
                {user?.profilePicture ? (
                    <img
                        src={user?.profilePicture}
                        alt='User profile picture'
                        className='h-[75px] w-[75px] size-fit rounded-[4px]'
                    />
                ) : (
                    <div className='flex items-center justify-center h-[75px] w-[75px] text-[11px] text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
                        No photo
                    </div>
                )}
            </div>
            <div
                className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform md:hidden'
                onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            >
                <Menu
                    size={18}
                    className='text-hash-color'
                />
            </div>
        </nav>
    );
};





// Export
export default HomeTopbar;