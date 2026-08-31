'use client';
// Imports
import Image from 'next/image';
import modules from '@/constants/modules';
import {usePathname} from 'next/navigation';
import {MoveRight, ChevronDown} from 'lucide-react';
import {useContext, useEffect, useState} from 'react';
import {GlobalStateContext} from '@/context/GlobalStateContext';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';





// Main function
const ModulesAccordion = ({isSidebarOpened, setIsSidebarOpened, user}:any) => {

    // Router
    const pathname = usePathname();


    // Opened pages
    const {openedPages, setOpenedPages, setCurrentPage} = useContext(GlobalStateContext);


    // Currnet Module
    const [currentModule, setCurrentModule] = useState<any>({});


    // Select Module
    const [selectedModule, setSelectedModule] = useState('');


    // Selected Page
    const [selectedSubPage, setSelectedSubPage] = useState('');


    // Selected thread
    const [selectedThread, setSelectedThread] = useState('');


    // Thread click
    const pageClick = (page:any) => {
        setIsSidebarOpened(false);
        setCurrentPage(page);
        setSelectedThread(page);
        if(openedPages.includes(page)){
            return;
        } else {
            const uniquePagesNames = openedPages.filter((item:any, index:any) => openedPages.indexOf(item) === index);
            setOpenedPages([...uniquePagesNames, page]);
        };
    };


    // Use Effects
    useEffect(() => {
        const threadName = pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
        setSelectedThread(threadName);
        const pageName = pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);
        setSelectedModule(pageName);
    }, [pathname]);
    useEffect(() => {
        if(user){
            // Selected Module
            const threadName = pathname.split('/')[2]?.split('-').join(' ').split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
            setSelectedThread(threadName);
            const pageName = pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1);
            setSelectedModule(pageName);
            
            
            // Current Module
            const module = modules.filter(module => module.moduleName === pathname.split('/')[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
            const permittedPages = user?.permissions?.find((p:any) => p?.name === currentModule?.moduleName)?.permissions.filter((pp:any) => pp?.add || pp?.modify || pp?.delete || pp?.print || pp?.read_only)?.map((pp:any) => pp?.main_menu);
            const permittedSubPages = user?.permissions?.find((p:any) => p?.name === currentModule?.moduleName)?.permissions.filter((pp:any) => pp?.add || pp?.modify || pp?.delete || pp?.print || pp?.read_only)?.map((pp:any) => pp?.sub_menu);
            setCurrentModule({
                ...module[0],
                pages:module[0]?.pages?.filter((p:any) => permittedPages?.includes(p?.pageName))?.map((p:any) => {
                    return{
                        ...p,
                        subPages:p.subPages?.filter((p:any) => permittedSubPages?.includes(p.subPageName) || p?.threads?.filter((t:any) => permittedSubPages?.includes(t))?.length > 0)?.map((sb:any) => {
                            return{
                                ...sb,
                                // threads:sb?.threads?.filter((t:any) => t)
                                threads:sb?.threads?.filter((t:any) => permittedSubPages?.includes(t))
                            };
                        })
                    };
                })
            });
        }
    }, [user, pathname, selectedModule]);

    return (
        <Accordion
            defaultValue={modules.map(module => module.moduleName)}
            type='multiple'
            className='w-full h-full mt-2 overflow-scroll custom-sidebar-scrollbar'
        >
            <AccordionItem
                value={
                    // @ts-ignore
                    currentModule?.moduleName
                }
            >
                {/* Layer 1 */}
                <div
                    className='cursor-pointer'
                >
                    <AccordionTrigger
                        onClick={() => setIsSidebarOpened(true)}
                        className='w-full flex flex-row justify-between px-4 text-white rounded-[8px] mt-2 transition bg-[#195382]'
                    >
                        <div className='flex flex-row w-full items-center gap-2 transition'>
                            <div className={`${!isSidebarOpened ? 'w-full' : 'w-auto'} flex justify-center`}>
                                {currentModule.icon && (
                                    <Image
                                        // @ts-ignore
                                        src={currentModule.icon}
                                        width={35}
                                        height={35}
                                        alt='Icon'
                                    />
                                )}
                            </div>
                            <p
                                className={`${isSidebarOpened ? 'block' : 'hidden'} text-[16px] text-bold`}
                            >
                                {
                                    // @ts-ignore
                                    currentModule?.moduleName
                                }
                            </p>
                        </div>
                        <ChevronDown className={`h-4 w-4 ml-12 shrink-0 text-white transition-transform duration-200  ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                    </AccordionTrigger>
                </div>
                <AccordionContent
                    className={`${isSidebarOpened ? 'block' : 'hidden'} bg-[#F6F6F6] mt-2 ml-4`}
                >


                    {/* Module Pages */}
                    <Accordion
                        type="single"
                        collapsible
                    >
                        {
                            // @ts-ignore
                            currentModule?.pages?.map(page => (
                                    <AccordionItem value={page.pageName}>
                                        {/* Layer 2 */}
                                        <AccordionTrigger
                                            onClick={() => setSelectedSubPage(page.pageName)}
                                            className={`flex flex-row justify-between px-4 py-2 mt-[5px] border-l-2 transition rounded-[8px] bg-white hover:bg-[#e7f0f7] hover:border-main-color hover:text-main-color ${selectedSubPage === page.pageName ? 'border-main-color bg-[#e7f0f7] text-main-color' : 'border-white'}`}
                                        >
                                            {page.pageName}
                                            <ChevronDown className={`h-4 w-4 ml-2 shrink-0 transition-transform duration-200 ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {
                                                page.subPages.map((subPage:any) => 
                                                    {
                                                        return subPage?.threads ?
                                                            (
                                                                <Accordion
                                                                    type="single"
                                                                    collapsible
                                                                >
                                                                    {/* Layer 3 */}
                                                                    <AccordionItem value='name'>
                                                                        <AccordionTrigger
                                                                            className='flex flex-row items-center justify-start ml-2 py-1 pr-2 transition hover:bg-white'
                                                                        >
                                                                            <p className='flex flex-row items-center text-[12px] ml-2'>
                                                                                <p className='font-bold mr-2'>{page.subPages.indexOf(subPage) + 1}.</p>
                                                                                <p>{subPage.subPageName}</p>
                                                                            </p>
                                                                            <ChevronDown className={`h-4 w-4 ml-12 shrink-0 transition-transform duration-200 ${isSidebarOpened ? 'block' : 'hidden'}`}/>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                            {
                                                                                subPage?.threads?.map((thread:any) => (
                                                                                    <div onClick={() => pageClick(thread)} className='group flex flex-row items-center ml-8 py-1 pr-2 transition-transform hover:bg-white cursor-pointer'>
                                                                                        <p
                                                                                            className={`text-[12px] transition ${selectedThread === thread && 'text-main-color'}`}
                                                                                        >
                                                                                            {thread}
                                                                                        </p>
                                                                                        <MoveRight
                                                                                            size={18}
                                                                                            className='hidden text-main-color ml-2 group-hover:block transition'
                                                                                        />
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                </Accordion>
                                                            )
                                                            :
                                                            (
                                                                <div onClick={() => pageClick(subPage.subPageName)} className='group flex flex-row items-center ml-2 py-1 pr-2 transition hover:bg-white cursor-pointer'>
                                                                    <div className={`text-[12px] ml-2 flex flex-row items-center ${selectedThread === subPage.subPageName && 'text-main-color'}`}>
                                                                        <p className='font-bold mr-2'>{page.subPages.indexOf(subPage) + 1}.</p>
                                                                        <p>{subPage.subPageName}</p>
                                                                    </div>
                                                                    <MoveRight
                                                                        size={18}
                                                                        className='opacity-0 text-main-color ml-2 group-hover:opacity-100 transition'
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    )
                                                }
                                        </AccordionContent>
                                    </AccordionItem>
                            ))
                        }
                    </Accordion>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};





// Export
export default ModulesAccordion;