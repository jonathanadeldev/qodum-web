'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import Admission from '@/components/Layout/pagesComponents/Admission';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <Admission />
    </Suspense>
  );
};





// Export
export default Home;