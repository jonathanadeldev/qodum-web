'use client';

// Imports
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {
    Globe,
    GraduationCap,
    PieChart
} from 'lucide-react';

import {fetchAdmissionStates} from '@/lib/actions/payroll/globalMasters/admissionStates.actions';
import {fetchAcademicYearsForDashboard} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';


// Main function
const Footer = () => {

    // Logo
    const [logo, setLogo] = useState('');


    // Active financial year
    const [activeFinancialYear, setActiveFinancialYear] = useState('');


    // Active academic year
    const [activeAcademicYearName, setActiveAcademicYearName] = useState('');


    // Use effect
    useEffect(() => {

        const fetcher = async () => {

            const admissionsStatesRes = await fetchAdmissionStates();

            setLogo(admissionsStatesRes.logo);

        };

        fetcher();

    }, []);


    // Use effect
    useEffect(() => {

        const academicYearsFetcher = async () => {

            const res = await fetchAcademicYearsForDashboard();

            setActiveAcademicYearName(
                res.academicYears.filter(
                    (year:any) => year.is_active
                )[0]?.year_name || ''
            );

            setActiveFinancialYear(
                res.activeFinancialYear.year_name
            );

        };

        academicYearsFetcher();

    }, []);


    return (

        <footer className='border-t border-[#E4E9F0] bg-white px-5 py-4 md:px-8'>

            <div className='mx-auto flex max-w-[1700px] flex-col gap-4 md:flex-row md:items-center md:justify-between'>


                {/* Company */}
                <Link
                    target='_blank'
                    href='https://qodumtech.com'
                    className='group flex w-fit items-center gap-2 text-[#718096] transition hover:text-[#2CABE3]'
                >

                    <span className='flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#F3F8FC] text-[#2CABE3] transition group-hover:bg-[#EAF6FC]'>

                        <Globe
                            size={16}
                            strokeWidth={1.8}
                        />

                    </span>

                    <div>

                        <p className='text-xs font-semibold'>
                            qodumtech.com
                        </p>

                        <p className='text-[10px] text-[#A0A9B5]'>
                            Visit our website
                        </p>

                    </div>

                </Link>


                {/* Academic / Financial Information */}
                <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5'>

                    <div className='flex items-center gap-2 text-[#687689]'>

                        <div className='flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#F4F8FC] text-[#5392C6]'>

                            <GraduationCap size={15}/>

                        </div>

                        <div>

                            <p className='text-[9px] uppercase tracking-[0.5px] text-[#9AA4B1]'>
                                Academic Year
                            </p>

                            <p className='text-xs font-medium text-[#4A586B]'>
                                {activeAcademicYearName || '—'}
                            </p>

                        </div>

                    </div>


                    <div className='hidden h-7 w-px bg-[#E5EAF0] sm:block' />


                    <div className='flex items-center gap-2 text-[#687689]'>

                        <div className='flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#F4F8FC] text-[#5392C6]'>

                            <PieChart size={14}/>

                        </div>

                        <div>

                            <p className='text-[9px] uppercase tracking-[0.5px] text-[#9AA4B1]'>
                                Financial Year
                            </p>

                            <p className='text-xs font-medium text-[#4A586B]'>
                                {activeFinancialYear || '—'}
                            </p>

                        </div>

                    </div>

                </div>


                {/* Institution Logo */}
                <div className='flex justify-start md:justify-end'>

                    {logo && (

                        <div className='flex h-10 items-center justify-center rounded-[8px] border border-[#E7ECF1] bg-[#FAFBFC] px-3'>

                            <Image
                                alt='Logo'
                                width={100}
                                height={40}
                                src={logo}
                                className='h-auto max-h-[32px] w-auto object-contain'
                            />

                        </div>

                    )}

                </div>

            </div>

        </footer>

    );

};


// Export
export default Footer;
