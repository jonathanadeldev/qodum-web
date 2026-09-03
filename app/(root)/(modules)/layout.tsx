import Breadcrumb from "@/components/layout/modulesLayout/Breadcrumb";
import Header from "@/components/layout/modulesLayout/Header";
import Sidebar from "@/components/layout/modulesLayout/Sidebar";
import Tabs from "@/components/layout/modulesLayout/Tabs";
import TabSync from "@/components/layout/modulesLayout/TabSync";
import { getCurrentUser } from "@/lib/auth/session";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();

    return (
        <main className='min-h-screen bg-[#ecedf0]'>
            <div className='relative mx-auto max-w-[1600px] flex items-start'>
                
                <aside className='hidden lg:block shrink-0'>
                    <div className='sticky top-4 h-[calc(100vh-2rem)] rounded-[14px] border border-[#dfe3ea] bg-white shadow-sm transition-all duration-300 ease-in-out'>
                        <Sidebar user={user} />
                    </div>
                </aside>

                <div className='min-w-0 flex-1'>
                    <Header user={user} />

                    <main className='mt-4 md:mt-6'>
                        <TabSync />
                        <Tabs />
                        <Breadcrumb />
                        <div className='rounded-[px] border border-[#dfe3ea] bg-white p-3 shadow-sm md:p-5 m-6'>
                            {children}
                        </div>
                    </main>
                </div>
                
            </div>
        </main>
    );
}