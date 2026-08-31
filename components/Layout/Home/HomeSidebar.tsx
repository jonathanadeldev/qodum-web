'use client';

// Imports
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Main function
const HomeSidebar = ({ user }: { user?: any }) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });
            if (!response.ok) throw new Error('Logout failed');
            router.replace('/');
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='h-full flex flex-col justify-between py-20 mx-4'>
            <div className='hidden flex-col items-center gap-2 md:flex'>
                {user?.profilePicture ? (
                    <img
                        src={user?.profilePicture}
                        alt='User profile picture'
                        className='h-[50px] w-[50px] size-fit rounded-full'
                    />
                ) : (
                    <div className='flex items-center justify-center h-[50px] w-[50px] text-[11px] text-hash-color rounded-full border-[0.5px] border-[#ccc]'>
                        No photo
                    </div>
                )}
                <span
                    onClick={handleLogout}
                    className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'
                >
                    <LogOut className='text-hash-color' size={20}/>
                </span>
            </div>
        </div>
    );
};





// Export
export default HomeSidebar;