import useSWR from 'swr';
import { fetchUsers } from '@/lib/actions/users/manageUsers/user.actions';
import { fetchStaff } from '@/lib/actions/payroll/globalMasters/staff.actions';
import { fetchGlobalSchoolDetails } from '@/lib/actions/fees/globalMasters/defineSchool/schoolGlobalDetails.actions';

export const useUsersList = () => {
  const { data, mutate } = useSWR('users-list', fetchUsers, { fallbackData: [] });
  return { users: data ?? [], mutateUsers: mutate };
};

export const useStaffList = () => {
  const { data } = useSWR('staff-list', fetchStaff, { fallbackData: [] });
  return data ?? [];
};

export const useSchoolsList = () => {
  const { data } = useSWR('schools-list', fetchGlobalSchoolDetails, { fallbackData: [] });
  return data ?? [];
};