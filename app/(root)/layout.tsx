// Imports
import '../globals.css';
import type {Metadata} from 'next';
// @ts-ignore
import {ABeeZee, Josefin_Sans} from 'next/font/google';
import Layout from '@/components/Layout/index';
import {GlobalStateProvider} from '@/context/GlobalStateContext';
import { getCurrentUser, clearAuthCookie } from '@/lib/auth/session';




// Configs
export const metadata: Metadata = {
  title:'Qodum',
  description:'School management system',
};
const JS = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
});
const ABZ = ABeeZee({
  subsets: ['latin'],
  weight: ['400']
});





// Main function
export default async function RootLayout({children}:{children:React.ReactNode}) {

  const user = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={`${ABZ.className}`}>
        <GlobalStateProvider>
          <Layout children={children} user={user} />
        </GlobalStateProvider>
      </body>
    </html>
  );
}