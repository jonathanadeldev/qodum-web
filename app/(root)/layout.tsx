// Imports
import '../globals.css';
import type {Metadata} from 'next';
// @ts-ignore
import {ABeeZee, Josefin_Sans} from 'next/font/google';
import Layout from '@/components/Layout/index';
import {AuthProvider} from '@/context/AuthContext';
import {GlobalStateProvider} from '@/context/GlobalStateContext';





// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;





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
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={`${ABZ.className}`}>
      {/* <body className={`${JS.className}`}> */}
          <AuthProvider>
            <GlobalStateProvider>
              <Layout children={children} />
            </GlobalStateProvider>
          </AuthProvider>
      </body>
    </html>
  );
}