import HomePage from '@/components/home';
import { getCurrentUser } from '@/lib/auth/session';


export default async function Page () {

  const user = await getCurrentUser();

  return (
    <HomePage user={user} />
  );
};