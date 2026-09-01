'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import Payroll from '@/components/Layout/pagesComponents/Payroll';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <Payroll />
    </Suspense>
  );
};





// Export
export default Home;