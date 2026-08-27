'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import DueLimit from '@/lib/models/fees/masterSettings/DueLimit.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isDueLimitsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await DueLimit.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Due limit session transfer
export const dueLimitsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await DueLimit.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create due limit props
interface CreateDueLimitProps{
    class_name:String;
    fee_type:String;
    late_fee_on_due:Boolean;
    dues_amount:Number;
    is_percent:Boolean;
    heads:String;
    fine_waive_off_setting:String;
};
// Create due limit
export const createDueLimit = async ({class_name, fee_type, late_fee_on_due, dues_amount, is_percent, heads, fine_waive_off_setting}:CreateDueLimitProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;

    
        // Due limit
        const dueLimit = await DueLimit.create({session:activeSession?.year_name, class_name, fee_type, late_fee_on_due, dues_amount, is_percent, heads, fine_waive_off_setting});
        dueLimit.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating due limit: ${err.message}`);
    };
};





// Fetch due limits
export const fetchDueLimits = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});

    
        // Due limits
        const dueLimits = await DueLimit.find({session:activeSession?.year_name});


        // Return
        return dueLimits;


    } catch (err:any) {
        console.log(`Error fetching due limits: ${err.message}`);
    };
};





// Modify due limit props
interface ModifyDueLimitProps{
    id:String;
    class_name:String;
    fee_type:String;
    is_percent:Boolean;
    late_fee_on_due:Boolean;
    dues_amount:Number;
    heads:String;
    fine_waive_off_setting:String;
}
// Modify due limit
export const modifyDueLimit = async ({id, class_name, fee_type, late_fee_on_due, is_percent, dues_amount, heads, fine_waive_off_setting}:ModifyDueLimitProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update due limit
        await DueLimit.findByIdAndUpdate(id, {class_name, fee_type, late_fee_on_due, is_percent, dues_amount, heads, fine_waive_off_setting}, {new:true});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating due limit: ${err}`);
    }
};





// Delete due limit
export const deleteDueLimit = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting due limit
        await DueLimit.findByIdAndDelete(id);
        return 'Due limit deleted';

    } catch (err) {
        throw new Error(`Error deleting due limit: ${err}`);      
    }
};





// Fetch class due limit
export const fetchClassDueLimit = async ({class_name}:{class_name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching
        const dueLimit = await DueLimit.findOne({class_name, session:activeSession?.year_name});
        return dueLimit;

    } catch (err) {
        throw new Error(`Error fetching due limit: ${err}`);      
    }
};