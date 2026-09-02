import Header from "@/components/modulesLayout/Header";
import Sidebar from "@/components/modulesLayout/Sidebar";
import { getCurrentUser } from "@/lib/auth/session";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();

    return (
        <main className='min-h-screen bg-[#ecedf0] px-3 py-4 md:px-5 lg:px-6'>
            <div className='relative mx-auto max-w-[1600px] flex gap-6 items-start'>
                
                <aside className='hidden lg:block shrink-0'>
                    <div className='sticky top-4 h-[calc(100vh-2rem)] rounded-[14px] border border-[#dfe3ea] bg-white shadow-sm transition-all duration-300 ease-in-out'>
                        <Sidebar user={user} />
                    </div>
                </aside>

                <div className='min-w-0 flex-1'>
                    <Header user={user} />

                    <main className='mt-4 md:mt-6'>
                        <div className='rounded-[14px] border border-[#dfe3ea] bg-white p-3 shadow-sm md:p-5'>
                            {children}
                        </div>
                    </main>
                </div>
                
            </div>
        </main>
    );
}