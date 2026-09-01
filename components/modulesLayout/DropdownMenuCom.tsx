// Imports
import Link from 'next/link';
import Image from 'next/image';
import {Menu} from 'lucide-react';
import modules from '@/constants/modulesHome';
import {AuthContext} from '@/context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';





// Main function
const DropdownMenuCom = () => {

    // Opened pages
    const {setOpenedPages} = useContext(GlobalStateContext);


    // User
    const {user} = useContext(AuthContext);


    // Permitted modules
    const [permittedModules, setPermittedModules] = useState(['']);


    // Use effect
    useEffect(() => {
        setPermittedModules(user?.permissions?.filter((p:any) => p?.permissions?.filter((pp:any) => pp?.add || pp?.modify || pp?.delete || pp?.print || pp?.read_only)?.length > 0)?.map((p:any) => p?.name));
    }, [user]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none flex justify-center items-center border-2 text-hash-color border-[#ccc] w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform'>
                <Menu
                    size={18}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='bg-white rounded-[8px] w-[200px]'
            >
                {modules.filter((module:any) => permittedModules?.includes(module.title)).map((module:any) => (
                    <Link
                        href={`/${module.title.toLowerCase().replace(/\s+/g,"-")}`}
                        onClick={() => setOpenedPages([])}
                        target='_blank'
                    >
                        <DropdownMenuItem className='h-full w-full py-0 px-0 cursor-pointer'>
                            <div
                                className={`group w-full flex flex-row justify-between px-2 py-2 text-xs transition hover:bg-[#e1e1e1]`}
                            >
                                    <div className={`flex flex-row w-full items-center gap-2 transition`}>
                                        <div className='flex justify-center'>
                                            {module.icon && (
                                                <Image
                                                    src={module.icon}
                                                    alt='Icon'
                                                    height={20}
                                                    width={20}
                                                />
                                            )}
                                        </div>
                                        <p className=''>
                                            {module.title}
                                        </p>
                                    </div>
                            </div>
                        </DropdownMenuItem>
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};





// Export
export default DropdownMenuCom;