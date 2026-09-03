// Imports
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {ArrowRight, Home} from 'lucide-react';
import modules from '@/constants/modulesHome';


// Main functions
export default function ModulesGrid ({user}:any) {

    // Permitted modules
    const [permittedModules, setPermittedModules] = useState(['']);


    // Use effect
    useEffect(() => {

        setPermittedModules(
            user?.permissions
                ?.filter(
                    (p:any) =>
                        p?.permissions?.filter(
                            (pp:any) =>
                                pp?.add ||
                                pp?.modify ||
                                pp?.delete ||
                                pp?.print ||
                                pp?.read_only
                        ).length > 0
                )
                ?.map((p:any) => p?.name)
        );

    }, [user]);


    return (
        <section className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {
                modules
                    .filter((module:any) => permittedModules.includes(module.title))
                    .map((module:any) => (
                        <div
                            className='group relative flex min-h-[295px] flex-col justify-between overflow-hidden rounded-[15px] border border-[#E4E9F0] bg-white p-5 shadow-[0_3px_14px_rgba(30,55,90,0.035)] transition duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(30,55,90,0.08)]'
                            key={module.title}
                        >

                            {/* Top Section */}
                            <div>
                                <div className='flex items-start gap-4'>
                                    {/* Module Icon */}
                                    <div className='flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[15px] border border-[#E1EAF3] bg-[#F4F8FC]'>
                                        <Image
                                            src={module.icon}
                                            alt={module.title}
                                            width={36}
                                            height={36}
                                            className='h-[36px] w-[36px] object-contain'
                                        />
                                    </div>

                                    {/* Title / Description */}
                                    <div className='min-w-0 pt-1'>
                                        <h4 className='text-[16px] font-bold tracking-[0.1px] text-[#17233C]'>
                                            {module?.title?.toUpperCase()}
                                        </h4>
                                        <p className='mt-1.5 text-xs leading-[18px] text-[#7A8798]'>
                                            Manage {module?.title?.toLowerCase()} related information and activities.
                                        </p>
                                    </div>
                                </div>


                                {/* Links */}
                                <div className='mt-5'>
                                    {
                                        module.sections.map((section:any) => (
                                            <Link
                                                key={section}
                                                target='_blank'
                                                href={`/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}?page=${encodeURIComponent(section)}`}
                                                className='group/link flex items-center justify-between rounded-[8px] border-b border-[#EDF0F4] px-2 py-[9px] transition duration-150 last:border-b-0 hover:bg-[#F4F9FD]'
                                            >
                                                <div className='flex min-w-0 items-center gap-2.5'>
                                                    <p className='truncate text-[13px] font-medium text-[#354154] transition group-hover/link:text-[#2CABE3]'>
                                                        {section}
                                                    </p>
                                                </div>
                                                <ArrowRight
                                                    size={15}
                                                    className='shrink-0 text-[#A2ADBA] transition group-hover/link:translate-x-1 group-hover/link:text-[#2CABE3]'
                                                />
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>


                            {/* Main Module Button */}
                            <Link
                                href={`/${module.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`}
                                target='_blank'
                                className='mt-5 block w-full'
                            >
                                <div className='flex h-[40px] w-full items-center justify-center gap-2 rounded-[9px] border border-[#D5E8F3] bg-[#F3F9FD] text-[13px] font-semibold text-[#2CABE3] transition duration-150 hover:border-[#2CABE3] hover:bg-[#2CABE3] hover:text-white'>
                                    <Home
                                        size={15}
                                        strokeWidth={1.8}
                                    />
                                    <span>
                                        Go to {module.title}
                                    </span>
                                    <ArrowRight
                                        size={15}
                                        className='transition group-hover:translate-x-1'
                                    />
                                </div>
                            </Link>
                        </div>
                    ))
            }
        </section>
    );
}