'use client';
import { useState, useContext } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoveRight,
} from 'lucide-react';
import modules from '@/constants/modules';
import { GlobalStateContext } from '@/context/GlobalStateContext';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';



// Types
type Permission = {
    sr_no?: number;
    main_menu?: string;
    sub_menu?: string;
    add?: boolean;
    modify?: boolean;
    delete?: boolean;
    print?: boolean;
    read_only?: boolean;
};
type UserModulePermission = {
    name?: string;
    permissions?: Permission[];
};



// Helpers
const hasPermission = (permission: Permission) => {
    return (
        permission?.add ||
        permission?.modify ||
        permission?.delete ||
        permission?.print ||
        permission?.read_only
    );
};
const slugify = (value: string = '') => {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
};
const formatRouteName = (value: string = '') => {
    return value
        .split('-')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};



// Main function
export default function Sidebar({ user }: { user?: any }) {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const { openedPages, setOpenedPages, setCurrentPage } = useContext(GlobalStateContext);

    const moduleSlug = pathname.split('/')[1] || '';
    const currentModule = modules.find((module: any) => slugify(module.moduleName) === moduleSlug);

    const currentModulePermissions: Permission[] =
        user?.permissions
            ?.find((permissionModule: UserModulePermission) => permissionModule?.name === currentModule?.moduleName)
            ?.permissions
            ?.filter(hasPermission) || [];

    const permittedMainMenus = new Set(currentModulePermissions.map(permission => permission?.main_menu).filter(Boolean));
    const permittedSubMenus = new Set(currentModulePermissions.map(permission => permission?.sub_menu).filter(Boolean));

    const permittedPages = currentModule?.pages
        ?.filter((page: any) => permittedMainMenus.has(page?.pageName))
        ?.map((page: any) => {
            const permittedSubPages =
                page?.subPages
                    ?.map((subPage: any) => {
                        const subPageIsPermitted = permittedSubMenus.has(subPage?.subPageName);
                        const permittedThreads = Array.isArray(subPage?.threads)
                            ? subPage.threads.filter((thread: string) => permittedSubMenus.has(thread))
                            : [];

                        if (!subPageIsPermitted && permittedThreads.length === 0) {
                            return null;
                        }

                        return {
                            ...subPage,
                            threads: Array.isArray(subPage?.threads)
                                ? subPageIsPermitted ? subPage.threads : permittedThreads
                                : undefined,
                        };
                    })
                    .filter(Boolean) || [];

            if (permittedSubPages.length === 0) return null;

            return { ...page, subPages: permittedSubPages };
        })
        .filter(Boolean) || [];

    const routeParts = pathname.split('/').filter(Boolean);
    const selectedThread = routeParts[1] ? formatRouteName(routeParts[1]) : '';
    const selectedModuleName = currentModule?.moduleName || '';

    const pageClick = (page: string) => {
        setCurrentPage(page);
        if (!openedPages.includes(page)) {
            const uniquePagesNames = openedPages.filter((item: string, index: number) => openedPages.indexOf(item) === index);
            setOpenedPages([...uniquePagesNames, page]);
        }
    };

    if (!currentModule) {
        return (
            <div className='flex h-full w-auto items-center justify-center px-4 text-center bg-white'>
                <div>
                    <p className='text-sm font-medium text-[#52627A] whitespace-nowrap'>Module not found</p>
                    <p className='mt-1 text-xs text-[#98A3B2] whitespace-nowrap'>Unable to determine the current module.</p>
                </div>
            </div>
        );
    }

    if (permittedPages.length === 0) {
        return (
            <div className='flex h-full w-auto items-center justify-center px-4 text-center bg-white'>
                <div>
                    <div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F7FA] text-[#8A96A6]'>
                        <Image src={currentModule.icon} width={24} height={24} alt='' className='opacity-60' />
                    </div>
                    <p className='text-sm font-medium text-[#52627A] whitespace-nowrap'>No pages available</p>
                    <p className='mt-1 text-xs text-[#98A3B2] whitespace-nowrap'>You don't have permission to access this module.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex h-full flex-col overflow-hidden bg-white transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-auto min-w-[220px]'}`}>
            
            {/* Collapsed State View */}
            {isCollapsed ? (
                <div className="flex h-full flex-col items-center py-4 gap-4 animate-in fade-in duration-300">
                    <button 
                        onClick={() => setIsCollapsed(false)}
                        className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-[#F2F9FD] text-[#52627A] transition-colors"
                        title="Expand sidebar"
                    >
                        <ChevronRight size={20} />
                    </button>
                    {currentModule?.icon && (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#F4F7FA] shadow-sm">
                            <Image src={currentModule.icon} width={24} height={24} alt="" className="object-contain" />
                        </div>
                    )}
                </div>
            ) : (
                /* Expanded State View */
                <div className="flex h-full flex-col animate-in fade-in duration-300">
                    <div className='shrink-0 border-b border-[#E8EDF2] bg-white px-3 py-3'>
                        {/* Collapse Toggle Button */}
                        <div className="flex justify-end mb-2">
                            <button 
                                onClick={() => setIsCollapsed(true)}
                                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-[#F2F9FD] text-[#52627A] transition-colors"
                                title="Collapse sidebar"
                            >
                                <ChevronLeft size={18} />
                            </button>
                        </div>

                        <Accordion type='single' collapsible defaultValue={selectedModuleName}>
                            <AccordionItem value={selectedModuleName} className='border-none'>
                                <AccordionTrigger className='rounded-[11px] border border-[#DCECF7] bg-[#F2F9FD] px-3 py-3 text-[#2CABE3] transition hover:no-underline hover:bg-[#ECF7FC]'>
                                    <div className='flex items-center gap-3 flex-1'>
                                        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-white shadow-sm'>
                                            {currentModule.icon && (
                                                <Image src={currentModule.icon} width={24} height={24} alt='' className='object-contain' />
                                            )}
                                        </div>
                                        <div className='text-left'>
                                            <p className='text-sm font-bold text-[#17233C] whitespace-nowrap'>
                                                {currentModule.moduleName}
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className='pb-0 pt-3'>
                                    <div className='max-h-[calc(100vh-180px)] overflow-y-auto pr-1 custom-sidebar-scrollbar'>
                                        <Accordion type='single' collapsible defaultValue={selectedThread} className='w-full'>
                                            {permittedPages.map((page: any) => {
                                                const hasSubPages = page?.subPages?.length > 0;
                                                if (!hasSubPages) return null;

                                                return (
                                                    <AccordionItem key={page.pageName} value={page.pageName} className='border-none'>
                                                        <AccordionTrigger className={`mb-1 rounded-[9px] px-3 py-2.5 text-left text-[13px] font-semibold transition hover:no-underline w-full ${selectedThread === page.pageName ? 'bg-[#F2F9FD] text-[#2CABE3]' : 'text-[#455368] hover:bg-[#F7F9FB]'}`}>
                                                            <div className='flex items-center gap-2'>
                                                                <span className='whitespace-nowrap'>{page.pageName}</span>
                                                                <ChevronDown size={16} className="shrink-0 text-[#8390A1] transition-transform duration-200" />
                                                            </div>
                                                        </AccordionTrigger>

                                                        <AccordionContent className='pb-1 pt-0'>
                                                            <div className='ml-3 border-l border-[#E5EBF1] pl-3'>
                                                                {page.subPages.map((subPage: any) => {
                                                                    const hasThreads = Array.isArray(subPage?.threads) && subPage.threads.length > 0;

                                                                    if (hasThreads) {
                                                                        return (
                                                                            <Accordion key={subPage.subPageName} type='single' collapsible className='w-full'>
                                                                                <AccordionItem value={subPage.subPageName} className='border-none'>
                                                                                    <AccordionTrigger className='rounded-[8px] px-2 py-2 text-left text-[12px] font-medium text-[#536176] transition hover:bg-[#F7F9FB] hover:no-underline w-full'>
                                                                                        <div className='flex items-center gap-2'>
                                                                                            <span className='whitespace-nowrap'>{subPage.subPageName}</span>
                                                                                            <ChevronDown size={14} className="shrink-0 text-[#8290A1] transition-transform duration-200" />
                                                                                        </div>
                                                                                    </AccordionTrigger>

                                                                                    <AccordionContent className='pb-1 pt-0'>
                                                                                        <div className='ml-2 flex flex-col gap-0.5'>
                                                                                            {subPage.threads.map((thread: string) => {
                                                                                                const isSelected = selectedThread === thread;
                                                                                                return (
                                                                                                    <button
                                                                                                        key={thread}
                                                                                                        type='button'
                                                                                                        onClick={() => pageClick(thread)}
                                                                                                        className={`group flex w-full items-center justify-between rounded-[7px] px-2.5 py-2 text-left text-[12px] transition ${isSelected ? 'bg-[#F2F9FD] font-medium text-[#2CABE3]' : 'text-[#687689] hover:bg-[#F7F9FB] hover:text-[#2CABE3]'}`}
                                                                                                    >
                                                                                                        <span className='whitespace-nowrap'>{thread}</span>
                                                                                                        <MoveRight size={14} className={`shrink-0 transition ${isSelected ? 'translate-x-0 opacity-100' : 'translate-x-[-3px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                                                                                    </button>
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </AccordionContent>
                                                                                </AccordionItem>
                                                                            </Accordion>
                                                                        );
                                                                    }

                                                                    const isSelected = selectedThread === subPage.subPageName;
                                                                    return (
                                                                        <button
                                                                            key={subPage.subPageName}
                                                                            type='button'
                                                                            onClick={() => pageClick(subPage.subPageName)}
                                                                            className={`group flex w-full items-center justify-between rounded-[8px] px-2 py-2 text-left text-[12px] transition ${isSelected ? 'bg-[#F2F9FD] font-medium text-[#2CABE3]' : 'text-[#687689] hover:bg-[#F7F9FB] hover:text-[#2CABE3]'}`}
                                                                        >
                                                                            <div className='flex items-center gap-2'>
                                                                                <span className='whitespace-nowrap'>{subPage.subPageName}</span>
                                                                            </div>
                                                                            <MoveRight size={14} className={`shrink-0 transition ${isSelected ? 'translate-x-0 opacity-100' : 'translate-x-[-3px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                );
                                            })}
                                        </Accordion>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            )}
        </div>
    );
}