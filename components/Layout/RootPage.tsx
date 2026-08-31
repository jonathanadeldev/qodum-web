'use client';
// Imports
import {redirect} from 'next/navigation';
import {useEffect} from 'react';
import Modules from '@/components/utils/Modules';





// Main function
const RootPage = ({user}:any) => {


  // Use effects
  useEffect(() => {
    if(!user) redirect('/sign-in');
  }, [user]);


  return (
    <>
      <Modules user={user}/>
    </>
  );
};





// Export
export default RootPage;