import Users from '@/components/Layout/pagesComponents/Users';
import { getCurrentUser } from '@/lib/auth/session';


export default async function Page () {

  const user = await getCurrentUser();

  return(
    <div>
      {/* <Users user={user}/> */}
      Users Dashboard

    </div>
  );
};