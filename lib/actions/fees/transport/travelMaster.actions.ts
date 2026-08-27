'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import TravelMaster from '@/lib/models/fees/transport/TravelMaster.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isTravelMasterSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await TravelMaster.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Travel masters session transfer
export const travelMasterSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await TravelMaster.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create Travel Master Props
interface CreateTravelMasterProps{
    travel_agency_name:String;
    mobile_no:Number;
    mail_id:String;
};
// Create travel master
export const createTravelMaster = async ({travel_agency_name, mobile_no, mail_id}:CreateTravelMasterProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Creating new travel master
        const newTravelMaster = await TravelMaster.create({session:activeSession?.year_name, travel_agency_name, mobile_no, mail_id});
        newTravelMaster.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error creating travel master: ${err.message}`);
    };
};





// Fetch travel masters
export const fetchTravelMasters = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const travelMasters = await TravelMaster.find({session:activeSession?.year_name});
        return travelMasters;

    } catch (err:any) {
        throw new Error(`Error fetching travel masters: ${err}`);
    };
};




// Modify travel master Props
interface ModifyTravelMasterProps{
    id:String;
    travel_agency_name:String;
    mobile_no:Number;
    mail_id:String;
};
// Modify travel master
export const modifyTravelMaster = async ({id, travel_agency_name, mobile_no, mail_id}:ModifyTravelMasterProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Updating travel master
        await TravelMaster.findByIdAndUpdate(id, {travel_agency_name, mobile_no, mail_id}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating travel master: ${err}`);
    };
};





// Delete travel master
export const deleteTravelMaster = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting board
        await TravelMaster.findByIdAndDelete(id);
        return 'Travel master Deleted';

    } catch (err) {
        throw new Error(`Error deleting travel master: ${err}`);
    };
};