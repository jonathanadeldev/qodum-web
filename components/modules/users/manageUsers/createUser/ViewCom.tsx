// components/modules/users/manageUsers/createUser/ViewCom.tsx
'use client';

import moment from 'moment';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown, X } from 'lucide-react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useUsersList } from '@/lib/hooks/useUserModuleData';
import { useFieldState, usePageStateStore } from '@/store/pageStateStore';
import { getTabPath } from '@/components/utils/breadcrumb';

// Main Function
const ViewCom = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tabPath = getTabPath(pathname);

  const { users } = useUsersList();
const clearPage = usePageStateStore((s) => s.clearPage);
const [, setEditingUser] = useFieldState('editingUser', null, tabPath);

  // Select handler
  const selectHandler = (u: any) => {
    clearPage(tabPath);
    setEditingUser({
      id: u._id,
      isDeleteClicked: false,
      name: u.name,
      user_name: u.user_name,
      password: u.password,
      is_reset_password: u.is_reset_password,
      designation: u.designation,
      email: u.email,
      employee: u.employee,
      mobile: u.mobile,
      profile_picture: u.profile_picture,
      schools: u.schools,
      is_active: u.is_active,
      enable_otp: u.enable_otp,
    });
    router.push(tabPath);
  };

  return (
    <Command
      className='w-[90%] max-h-[90%] flex flex-col items-center pb-2 gap-2 rounded-[8px] border-[0.5px] border-[#E8E8E8] lg:w-[70%]'
    >

      {/* Header */}
      <div className='flex flex-row items-center justify-between w-full px-2 py-2 text-sm font-bold text-main-color bg-[#e7f0f7] rounded-t-[8px]'>
        <h2>Users List</h2>
        <X color='#3a3a3a' size={18} cursor={'pointer'} onClick={() => router.push(tabPath)}/>
      </div>
      <div className='w-[95%] h-[90%] flex flex-col items-center bg-[#F1F1F1] rounded-[8px]'>

        {/* Search input */}
        <div className='w-full flex flex-row justify-end pr-4 py-2 border-b-[0.5px] border-[#ccc]'>
          <CommandInput
            placeholder='Search list'
            className='h-full text-xs text-hash-color w-[250px] bg-white'
          />
        </div>

        {/* User */}
        <div className='w-full flex flex-col h-[90%] overflow-scroll custom-sidebar-scrollbar'>
          {/* Headers */}
          <ul className='w-full min-w-[900px] flex flex-row text-[10px] border-b-[0.5px] border-[#ccc] text-hash-color cursor-pointer sm:text-xs md:text-md'>
            <li className='basis-[10%] flex flex-row items-center justify-between px-2 py-[2px] border-r-[0.5px] border-[#ccc]'>
              Sr. No.
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
              Select
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
              Name
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
              User Name
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[20%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
              Email
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[15%] flex flex-row items-center justify-between px-2 border-r-[0.5px] border-[#ccc]'>
              Designation
              <ChevronsUpDown size={12}/>
            </li>
            <li className='basis-[10%] flex flex-row items-center justify-between px-2'>
              OTP Enabled
              <ChevronsUpDown size={12}/>
            </li>
          </ul>
          {/* Values */}
          <CommandList>
            {
              users.length < 1 ? (
                <p className='w-full flex flex-row p-2 text-sm bg-[#E2E4FF] border-b-[0.5px] border-[#ccc]'>
                  No users
                </p>
              ) : !users[0]?.name ? (
                  <LoadingIcon />
                ) : users.map((c: any) => (
                  <CommandItem
                    value={`${users.indexOf(c) + 1} ${c.name}`}
                    className='w-full min-w-[900px] flex flex-row text-[10px] bg-[#E2E4FF] border-b-[0.5px] border-[#ccc] sm:text-xs md:text-md'
                  >
                    <li className='basis-[10%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{users.indexOf(c) + 1}</li>
                    <li className='basis-[15%] flex flex-row items-center justify-center px-2 border-r-[0.5px] border-[#ccc]'>
                      <Button
                        className='px-[8px] h-6 text-[10px] text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-full border-[#E2E4FF]
                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color sm:text-xs sm:px-4'
                        onClick={() => selectHandler(c)}
                      >
                        Select
                      </Button>
                    </li>
                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{c.name}</li>
                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{c.user_name}</li>
                    <li className='basis-[20%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{c.email}</li>
                    <li className='basis-[15%] flex flex-row items-center px-2 border-r-[0.5px] border-[#ccc]'>{c.designation}</li>
                    <li className='basis-[10%] flex flex-row items-center px-2'>{c.otp_enable ? 'True' : 'False'}</li>
                  </CommandItem>
                ))
            }
          </CommandList>
        </div>

        {/* Buttons */}
        <div className='w-full flex flex-row items-center justify-between py-4 px-2 border-t-[0.5px] border-[#ccc]'>
          {/* Items per page */}
          <div className='text-[10px] flex flex-col items-center gap-2 sm:text-sm sm:flex-row'>
            <p className='text-hash-color'>Items per page:</p>
            <Select>
              <SelectTrigger className='flex flex-row items-center h-8 pl-2 text-[10px] bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4] sm:text-xs'>
                <SelectValue placeholder='1000' className='text-xs'/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='15'>15</SelectItem>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Skipping */}
          <div className='flex flex-row items-center gap-[2px] sm:gap-[4px]'>
            <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>First</Button>
            <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Prev.</Button>
            <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>1</Button>
            <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Next</Button>
            <Button disabled className='h-5 text-[10px] my-[0.5px] px-2 bg-white rounded-[5px] text-hash-color hover:bg-[#F1F1F1] sm:text-xs sm:px-4 sm:h-7 xl:px-6'>Last</Button>
          </div>
        </div>

      </div>
    </Command>
  );
};

export default ViewCom;