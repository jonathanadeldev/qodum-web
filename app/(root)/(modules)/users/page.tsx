'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import Users from '@/components/Layout/pagesComponents/Users';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <Users />
    </Suspense>
  );
};





// Export
export default Home;