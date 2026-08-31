// Improts
import '../globals.css';
import {ABeeZee} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';





// Configs
export const metadata = {
  title:'Qodum',
  description:'School management system | Auth',
};
const ABZ = ABeeZee({
  subsets: ['latin'],
  weight: ['400']
});





// Main function
export default async function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${ABZ.className}`}>
        <div className='w-full flex items-center justify-center min-h-screen'>
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}