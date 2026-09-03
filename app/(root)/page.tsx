import HomePage from '@/components/layout/homeLayout';
import { getCurrentUser } from '@/lib/auth/session';


export default async function Page () {

  const user = await getCurrentUser();

  return (
    <HomePage user={user} />
  );
};