// Imports
import '../globals.css';
import type {Metadata} from 'next';
// @ts-ignore
import {ABeeZee} from 'next/font/google';

import {GlobalStateProvider} from '@/context/GlobalStateContext';
import {AuthProvider} from '@/context/AuthContext';


// Configs
export const metadata: Metadata = {
    title: 'Qodum',
    description: 'School management system',
};
const ABZ = ABeeZee({
  subsets: ['latin'],
  weight: ['400']
});


// Main function
export default async function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang='en'>
      <body className={`${ABZ.className} bg-[#F6F8FB] text-[#17233C]`}>
        <AuthProvider>
          <GlobalStateProvider>
            {children}
          </GlobalStateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}