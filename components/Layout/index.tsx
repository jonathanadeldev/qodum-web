'use client';
// Imports
import moment from 'moment';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Pages/Topbar';
import Clock from 'react-live-clock';
import {Toaster} from '../ui/toaster';
import {LogOut} from 'lucide-react';
import PagesList from './Pages/PagesList';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import {fetchAcademicYearsForDashboard, modifyAcademicYearWithYearName} from '@/lib/actions/accounts/globalMasters/defineSession/defineAcademicYear.actions';





// Main function
const index = ({children, user }:any) => {

    // Setting moment local to english
    moment.locale('en-gb');


    // Today's Date
    const date = new Date();
    const today = moment(date).format('ddd, DD MMM Y');


    // Sidebar Toggler
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);


    // Pathname
    const pathname = usePathname();


    // Academic Years
    const [academicYears, setAcademicYears] = useState([{}]);


    // Active financial year
    const [activeFinancialYear, setActiveFinancialYear] = useState('');


    // Active academic year
    const [activeAcademicYearName, setActiveAcademicYearName] = useState('');


    // Setting active academic year
    const settingActiveAcademicYear = async (year_name:any) => {
        try {
            await modifyAcademicYearWithYearName({year_name});
            setActiveAcademicYearName(year_name);
        } catch (err) {
            console.log(err);
        }
    };


    // Use effect
    useEffect(() => {
        const academicYearsFetcher = async () => {
            const res = await fetchAcademicYearsForDashboard();
            // const activeFinancialYearRes = await fetchActiveFinancialYear();
            setAcademicYears(res.academicYears);
            setActiveAcademicYearName(res.academicYears.filter((year:any) => year.is_active)[0]?.year_name || '');
            setActiveFinancialYear(res.activeFinancialYear.year_name);
        };
        academicYearsFetcher();
    }, []);

    return (
        <main className='w-full h-screen flex flex-row bg-[#ecedf0]'>
            {pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) !== '' && (
                <Sidebar
                    isSidebarOpened={isSidebarOpened}
                    setIsSidebarOpened={setIsSidebarOpened}
                    user={user}
                />
            )}
            <div className='relative flex flex-col flex-1 overflow-hidden'>
                {
                    pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) !== '' && (
                        <>
                            <Topbar
                                isSidebarOpened={isSidebarOpened}
                                setIsSidebarOpened={setIsSidebarOpened}
                                academicYears={academicYears}
                                settingActiveAcademicYear={settingActiveAcademicYear}
                                activeAcademicYearName={activeAcademicYearName}
                                user={user}
                            />
                            <PagesList />
                        </>
                    )
                }
                <div className='flex-1 flex flex-col justify-between overflow-scroll custom-scrollbar'>
                    {pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1) === '' ? (
                        <div className='flex flex-row items-start'>
                            <aside className='flex flex-col items-center justify-between w-[200px] mt-8 py-10 ml-5 bg-[#fff] rounded-[10px] fixed' style={{height:'calc(100% - 100px)'}}>
                                <div className='flex flex-col items-center gap-1'>
                                    {user?.profile_picture ? (
                                        <img
                                            src={user?.profile_picture}
                                            alt='User profile picture'
                                            className='h-[100px] w-[100px] size-fit rounded-[4px]'
                                        />
                                    ) : (
                                        <div className='flex items-center justify-center h-[100px] w-[100px] text-[11px] text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
                                            No photo
                                        </div>
                                    )}
                                    <p className='h-5 mt-3 text-lg text-semibold text-hash-color'>{user?.name}</p>
                                    <p className='text-xs text-hash-color'>{user?.designation}</p>
                                    <p className='text-xs text-hash-color'>{user?.mobile}</p>
                                    <p className='text-xs text-hash-color'>{user?.email}</p>
                                    <span
                                        onClick={() => {/* Logout */}}
                                        className='flex justify-center items-center border-2 border-[#ccc] w-7 h-7 rounded-full cursor-pointer hover:scale-105 transition-transform'
                                    >
                                        <LogOut className='text-hash-color' size={15}/>
                                    </span>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-[#5392C6] text-sm mb-2'>{today}</p>
                                    <Clock format={'HH:mm:ss'} ticking={true} className='text-4xl'/>
                                </div>
                            </aside>
                            <div className='w-full pl-[220px]'>
                                {children}
                            </div>
                        </div>
                    ) : children}
                    <Toaster />
                </div>
                <Footer />
            </div>
        </main>
    );
};





// Export
export default index;