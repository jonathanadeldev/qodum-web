// Imports
import {Input} from '../../ui/input';
import {useEffect, useState} from 'react';
import DropdownMenuCom from '../../utils/DropdownMenuCom';
import {Select, SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';
import {Scan, Grid3X3, Search, Globe, CalendarDays, Flag, Bell, ArrowLeft, Check, Shrink, LogOut} from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';
  




// Main function
const Topbar = ({isSidebarOpened, setIsSidebarOpened, settingActiveAcademicYear, academicYears, activeAcademicYearName, user}:any) => {

    // School link
    const [schoolLink, setSchoolLink] = useState('');


    // Router
    const router = useRouter();


    // Full screen page handler
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fullScreenHandler = (state:any) => {
        if(state === 'open'){
            document.body.requestFullscreen();
            setIsFullscreen(true);
        }else{
            document.exitFullscreen()
            setIsFullscreen(false);
        }
    };


    async function handleLogout() {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" })
            if (!response.ok) throw new Error("Logout failed")
            router.replace("/")
            router.refresh()
        } catch {

        }
    }
    // Use effects
    useEffect(() => {
        const fetcher = async () => {
            const schoolRes = await fetchGlobalSchoolDetails();
            setSchoolLink(schoolRes[0].website);
        };
        fetcher();
        function onFullscreenChange() {
          setIsFullscreen(Boolean(document.fullscreenElement));
        };
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    return (
        <nav className='flex flex-col items-center justify-between bg-white w-full border-b-[0.5px] border-[#ccc] px-4 py-2 lg:flex-row'>


            <div
                className='hidden flex-row justify-between items-center gap-3 border-[#ccc] lg:w-auto lg:border-b-0 lg:flex'
            >
                <div className='flex flex-row justify-between gap-3'>
                    <div
                        className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'
                        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    >
                        <ArrowLeft
                            size={18}
                            className={`text-hash-color ${!isSidebarOpened && 'rotate-180 transition'}`}
                        />
                    </div>
                    <DropdownMenuCom />
                    <div
                        onClick={() => fullScreenHandler(isFullscreen ? 'close' : 'open')}
                        className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'
                    >
                        {isFullscreen ? (
                            <Shrink
                                size={18}
                                className='text-hash-color'
                            />
                        ) : (
                            <Scan
                                size={18}
                                className='text-hash-color'
                            />
                        )}
                    </div>
                    <div className='hidden justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:flex'>
                        <Grid3X3
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>
                <div
                    className='relative hidden lg:block'
                >
                    <Input
                        placeholder='Search'
                        className='rounded-[5px] border-[#ccc] text-xs text-hash-color w-[250px]'
                    />
                    <Search
                        size={20}
                        className='absolute right-2 top-[25%] text-white cursor-pointer'
                    />
                </div>
            </div>


            <div
                className='flex flex-row w-full justify-between items-center gap-4 mt-2 lg:gap-10 lg:w-auto lg:mt-0'
            >
                <div className='flex flex-row items-center gap-2'>
                    <div
                        className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform lg:hidden'
                        onClick={() => setIsSidebarOpened(!isSidebarOpened)}
                    >
                        <ArrowLeft
                            size={18}
                            className={`text-hash-color ${!isSidebarOpened && 'rotate-180 transition'}`}
                        />
                    </div>
                    <div className='block lg:hidden'>
                        <DropdownMenuCom />
                    </div>
                </div>
                <div className='flex flex-row justify-between gap-3'>
                    <a
                        href={schoolLink || ''}
                        target='_blank'
                        className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'
                    >
                        <Globe
                            size={18}
                            className='text-hash-color'
                        />
                    </a>


                    {/* Selecting active academic session */}
                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Select
                            onValueChange={v => settingActiveAcademicYear(v)}
                        >
                            <SelectTrigger>
                                <CalendarDays
                                    size={18}
                                    className='text-hash-color'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {academicYears.map((year:any) => (
                                    <SelectItem
                                        value={year.year_name}
                                        key={year._id}
                                    >
                                        <div className='flex flex-row items-center'>
                                            {activeAcademicYearName === year.year_name && <Check size={12} className='mr-[2px]'/>}
                                            {year.year_name}
                                        </div>
                                    </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Flag
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                    <div className='flex justify-center items-center border-2 border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                        <Bell
                            size={18}
                            className='text-hash-color'
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    {user?.profile_picture ? (
                        <img
                            src={user?.profile_picture}
                            alt='User profile picture'
                            className='h-[75px] w-[75px] size-fit rounded-[4px]'
                        />
                    ) : (
                        <div className='flex items-center justify-center h-[75px] w-[75px] text-[11px] text-hash-color rounded-[4px] border-[0.5px] border-[#ccc]'>
                            No photo
                        </div>
                    )}
                    <div className='flex flex-col justify-center items-start pl-[4px] border-l-[1px] border-[#ccc]'>
                        <p className='h-5 text-md text-semibold text-hash-color'>{user?.name}</p>
                        <p className='text-xs text-hash-color'>{user?.designation}</p>
                        <span
                            onClick={() => handleLogout()}
                            className='flex justify-center items-center border-2 border-[#ccc] w-7 h-7 rounded-full cursor-pointer hover:scale-105 transition-transform'
                        >
                            <LogOut className='text-hash-color' size={15}/>
                        </span>
                    </div>
                </div>
            </div>


        </nav>
    );
};





// Export
export default Topbar;