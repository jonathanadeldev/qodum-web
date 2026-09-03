'use client';
import Image from 'next/image';
import modules from '@/constants/modulesHome';
import { Home, LayoutDashboard, LogOut, Settings, ShieldCheck, User, UserRound, } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';


// Main function
export default function Sidebar ({ user }: { user?: any }) {

    const router = useRouter();
    const pathname = usePathname();


    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Logout failed');
            router.replace('/');
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };


    const navigationItems = [
        {
            title: 'Dashboard',
            href: '/',
            icon: LayoutDashboard
        },
        {
            title: 'Profile',
            href: '/profile',
            icon: UserRound
        },
        {
            title: 'Settings',
            href: '/settings',
            icon: Settings
        }
    ];

    return (

        <div className='flex h-full flex-col justify-between px-4 py-5'>

            {/* Brand */}
            <div>
                <div className='flex items-center gap-3 border-b border-[#EDF1F5] px-2 pb-5'>
                    <div className='flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-[#EEF7FC] text-[#2CABE3]'>
                        <ShieldCheck
                            size={23}
                            strokeWidth={1.8}
                        />
                    </div>
                    <div>
                        <h2 className='text-[18px] font-bold tracking-[-0.2px] text-[#17233C]'>
                            Qodum
                        </h2>
                        <p className='text-[10px] font-medium uppercase tracking-[0.7px] text-[#8A96A6]'>
                            School Management
                        </p>
                    </div>
                </div>


                {/* Navigation */}
                <nav className='mt-6'>

                    <p className='mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#A0A9B5]'>
                        Main
                    </p>

                    <div className='flex flex-col gap-1'>

                        {
                            navigationItems.map((item) => {

                                const Icon = item.icon;

                                const isActive =
                                    item.href === '/'
                                        ? pathname === '/'
                                        : pathname.startsWith(item.href);

                                return (

                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className={`
                                            group flex items-center gap-3 rounded-[10px] px-3 py-3
                                            transition duration-150
                                            ${
                                                isActive
                                                    ? 'border border-[#DCECF7] bg-[#F2F9FD] text-[#2CABE3]'
                                                    : 'border border-transparent text-[#536176] hover:border-[#E7EEF4] hover:bg-[#F8FAFC] hover:text-[#2CABE3]'
                                            }
                                        `}
                                    >

                                        <Icon
                                            size={19}
                                            strokeWidth={1.8}
                                            className={`
                                                transition
                                                ${
                                                    isActive
                                                        ? 'text-[#2CABE3]'
                                                        : 'text-[#718096] group-hover:text-[#2CABE3]'
                                                }
                                            `}
                                        />

                                        <span className='text-sm font-medium'>
                                            {item.title}
                                        </span>

                                    </Link>

                                );

                            })
                        }

                    </div>

                </nav>
                    
            </div>


            {/* User Area */}
            <div>
                <div className='mb-3 h-px bg-[#EDF1F5]' />
                <div className='flex items-center gap-3 rounded-[12px] bg-[#F8FAFC] p-3'>

                    {/* Profile */}
                    {user?.profilePicture ? (
                        <img
                            src={user?.profilePicture}
                            alt='User profile picture'
                            className='h-[42px] w-[42px] rounded-full border border-[#DCE5EE] object-cover'
                        />
                    ) : (
                        <div className='flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#DCE5EE] bg-white text-[9px] text-[#7B8798]'>
                            No photo
                        </div>
                    )}

                    <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-semibold text-[#17233C]'>
                            {user?.name || 'Administrator'}
                        </p>
                        <p className='truncate text-[11px] text-[#8490A0]'>
                            {user?.designation || 'Administrator'}
                        </p>
                    </div>


                    {/* Logout */}
                    <button
                        type='button'
                        onClick={handleLogout}
                        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#DCE2E9] bg-white text-[#718096] transition hover:border-[#2CABE3] hover:bg-[#F2F9FD] hover:text-[#2CABE3]'
                        aria-label='Logout'
                    >
                        <LogOut size={15}/>
                    </button>
                </div>
            </div>
        </div>
    );
};