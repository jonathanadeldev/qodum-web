// Imports
import RootPage from '@/components/Layout/RootPage';
import { getCurrentUser } from '@/lib/auth/session';





// Main function
const Home = async () => {

  const user = await getCurrentUser();

  return (
    <RootPage user={user} />
  );
};





// Export
export default Home;