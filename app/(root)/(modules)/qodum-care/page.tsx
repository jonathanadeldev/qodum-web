'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import QodumCare from '@/components/Layout/pagesComponents/QodumCare';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <QodumCare />
    </Suspense>
  );
};





// Export
export default Home;