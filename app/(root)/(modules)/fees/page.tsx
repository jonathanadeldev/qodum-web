'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import Fees from '@/components/Layout/pagesComponents/Fees';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <Fees />
    </Suspense>
  );
};





// Export
export default Home;