'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import ModulesGrid from './ModulesGrid';
import Footer from '../Layout/Footer';

export default function HomePage({ user }: any) {

    return (
        <main className='min-h-screen bg-[#F6F8FB] px-3 py-3 md:px-5 lg:px-6'>
            <div className='relative mx-auto max-w-[1700px] lg:pl-[250px]'>

                {/* Sidebar */}
                <aside className='hidden lg:block'>
                    <div className='fixed left-4 top-3 h-[calc(100vh-1.5rem)] w-[220px] overflow-hidden rounded-[18px] border border-[#E4E9F0] bg-white shadow-[0_4px_20px_rgba(30,55,90,0.05)]'>
                        <Sidebar user={user} />
                    </div>
                </aside>

                {/* Main Content */}
                <div className='min-w-0'>

                    <Header user={user} />

                    {/* Welcome Banner */}
                    <section className='mt-4 overflow-hidden rounded-[16px] border border-[#E2E9F2] bg-white shadow-[0_3px_16px_rgba(30,55,90,0.04)]'>
                        <div className='relative flex min-h-[120px] items-center overflow-hidden px-6 py-6 md:px-8'>

                            <div className='relative z-10'>
                                <p className='mb-1 text-sm font-medium text-[#6E7D91]'>
                                    School Management System
                                </p>

                                <h1 className='text-[24px] font-bold tracking-[-0.4px] text-[#17233C] md:text-[28px]'>
                                    Welcome back, {user?.name || 'Administrator'} 👋
                                </h1>

                                <p className='mt-2 text-sm text-[#718096]'>
                                    Manage your institution seamlessly from one place.
                                </p>
                            </div>

                            {/* Decorative building */}
                            <div className='pointer-events-none absolute right-5 bottom-[-35px] hidden opacity-[0.12] md:block'>
                                <svg
                                    width='360'
                                    height='170'
                                    viewBox='0 0 360 170'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M38 145V82H322V145'
                                        stroke='#2CABE3'
                                        strokeWidth='6'
                                    />
                                    <path
                                        d='M18 82L180 20L342 82H18Z'
                                        stroke='#2CABE3'
                                        strokeWidth='6'
                                    />
                                    <path
                                        d='M135 145V92H225V145'
                                        stroke='#2CABE3'
                                        strokeWidth='6'
                                    />
                                    <path
                                        d='M70 102H105V145H70V102ZM255 102H290V145H255V102Z'
                                        stroke='#2CABE3'
                                        strokeWidth='6'
                                    />
                                    <path
                                        d='M180 20V5'
                                        stroke='#2CABE3'
                                        strokeWidth='6'
                                    />
                                </svg>
                            </div>
                        </div>
                    </section>

                    {/* Modules */}
                    <section className='mt-4 rounded-[16px] border border-[#E2E9F2] bg-white p-4 shadow-[0_3px_16px_rgba(30,55,90,0.04)] md:p-5 lg:p-6'>
                        <ModulesGrid user={user} />
                    </section>

                    <Footer />

                </div>
            </div>
        </main>
    );
}