'use client';
// Imports
import Image from 'next/image';
import {X} from 'lucide-react';
import {redirect, usePathname} from 'next/navigation';
import HomeSidebar from './Home/HomeSidebar';
import ModulesAccordion from './Pages/ModulesAccordion';
import Link from 'next/link';





// Main function
const Sidebar = ({isSidebarOpened, setIsSidebarOpened, user}:any) => {


    // Pathname
    const pathname = usePathname();


    return (
        <aside
            onMouseEnter={() => setIsSidebarOpened(true)}
            className={`flex flex-col bg-[#FAFAFA] items-center z-10 absolute h-full w-full transition-all duration-300 ${isSidebarOpened ? 'left-0 px-4' : 'left-[-100%] px-1'} md:relative md:w-auto md:left-0`}
        >

            {/* Logo */}
            <div
                className='w-full flex flex-row items-center justify-between py-[10px] border-b-[0.5px] border-[#ccc] md:justify-center'
            >
                <Link
                    href='/'
                >
                    <Image
                        width={isSidebarOpened ? 125 : 50}
                        height={isSidebarOpened ? 125 : 50}
                        alt='Qodum logo'
                        src='/assets/logo.png'
                        className={`${isSidebarOpened ? 'py-[2px]' : 'py-[21px]'} rounded-[5px]`}
                    />
                </Link>
                <div
                    className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition md:hidden'
                    onClick={() => setIsSidebarOpened(false)}
                >
                    <X
                        size={18}
                        className='text-hash-color'
                    />
                </div>
            </div>


            {
                pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) === ''
                ? (
                    <HomeSidebar user={user} />
                ) : (
                    <ModulesAccordion
                        isSidebarOpened={isSidebarOpened}
                        setIsSidebarOpened={setIsSidebarOpened}
                        user={user}
                    />
                )
            }
            
        </aside>
    );
};





// Export
export default Sidebar;