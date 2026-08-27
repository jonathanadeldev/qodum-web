'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import LateFeeHeadWise from '@/lib/models/fees/feeMaster/lateFeeSettings/LateFeeHeadWise.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isLateFeeHeadWiseSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await LateFeeHeadWise.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Late fee head wise session transfer
export const lateFeeHeadWiseSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await LateFeeHeadWise.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create late fee head wise props
interface CreateLateFeeHeadWiseProps{
    fee_group:String;
    fee_type:String;
    installment:String;
    head:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
};
// Create late fee head wise
export const createLateFeeHeadWise = async ({fee_group, fee_type, installment, head, due_date, late_fee_type, amount}:CreateLateFeeHeadWiseProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new late fee
        const newLateFeeHeadWise = await LateFeeHeadWise.create({session:activeSession?.year_name, fee_group, fee_type, installment, head, due_date, late_fee_type, amount});
        newLateFeeHeadWise.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating late fee head wise: ${err.message}`);
    }
};





// Fetch late fees head wise
export const fetchLateFeesHeadWise = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching late fees
        const lateFeesHeadWise = await LateFeeHeadWise.find({session:activeSession?.year_name});
        return lateFeesHeadWise;

    } catch (err:any) {
        throw new Error(`Error fetching late fees head wise: ${err}`);
    }
};





// Modify late fee head wise props
interface ModifyLateFeeHeadWiseProps{
    id:String;
    fee_group:String;
    fee_type:String;
    installment:String;
    head:String;
    due_date:Date;
    late_fee_type:String;
    amount:Number;
}
// Modify late fee head wise with id
export const modifyLateFeeHeadWise = async ({id, fee_group, fee_type, installment, head, due_date, late_fee_type, amount}:ModifyLateFeeHeadWiseProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating late fee head wise
        await LateFeeHeadWise.findByIdAndUpdate(id, {fee_group, fee_type, installment, head, due_date, late_fee_type, amount});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating late fee head wise: ${err}`);
    }
};





// Delete late fee head wise
export const deleteLateFeeHeadWise = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting late fee head wise
        await LateFeeHeadWise.findByIdAndDelete(id);
        return 'Late fee head wise deleted';

    } catch (err) {
        throw new Error(`Error deleting late fee head wise: ${err}`);
    }
};