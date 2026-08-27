'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AccountGroup from '@/lib/models/accounts/accounts/AccountGroup.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isGroupSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await AccountGroup.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Group session transfer
export const groupsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        // TODO: transfer logic


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create account group props
interface CreateAccountGroupProps{
    group_name:String;
    category:String;
    group_type:String;
    group_no:Number;
};
// Create account group
export const createAccountGroup = async ({group_name, category, group_type, group_no}:CreateAccountGroupProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if account group already exists
        const existingAccountGroup = await AccountGroup.findOne({group_name, session:activeSession?.year_name});
        if(existingAccountGroup){
            throw new Error('Account group already exists.');
        };


        // Creating new account group
        const newAccountGroup = await AccountGroup.create({
            session:activeSession?.year_name,
            group_name,
            category,
            group_type,
            group_no
        });
        newAccountGroup.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Account Group: ${err.message}`);
    }
};





// Fetch Account Groups
export const fetchAccountGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const accountGroups = await AccountGroup.find({session:activeSession?.year_name});
        return accountGroups;

        
    } catch (err:any) {
        throw new Error(`Error fetching account groups: ${err}`);
    }
};




// Modify Account Groups Props
interface ModifyAccountGroupsProps{
    id:String;
    group_name:String;
    category:String;
    group_type:String;
    group_no:Number;
}
// Modify Account Group
export const modifyAccountGroup = async ({id, group_name, category, group_type, group_no}:ModifyAccountGroupsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Checking if the account group already exists
        const accountGroups = await AccountGroup.find({session:activeSession?.year_name});
        const existingAccountGroup = await AccountGroup.findById(id);
        if(existingAccountGroup.group_name !== group_name && accountGroups.map(accountGroup => accountGroup.group_name).includes(group_name)){throw new Error('Account group already exists')};


        // Update Account Group
        await AccountGroup.findByIdAndUpdate(id, {group_name, category, group_type, group_no}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating account group: ${err}`);
    }
};




// Delete Account Group
export const deleteAccountGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Account Group
        await AccountGroup.findByIdAndDelete(id);
        return 'Account Group Deleted';

    } catch (err) {
        throw new Error(`Error deleting account group: ${err}`);      
    }
};