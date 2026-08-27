'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import ConcessionType from '@/lib/models/fees/feeMaster/defineAndAssignConcession/ConcessionType.model';





// Is session transfered
export const isConcessionTypeSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await ConcessionType.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Concession type session transfer
export const concessionTypeSesssionTransfer = async ({next_session}:any) => {
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





// Create Concession Type Props
interface CreateConcessionTypeProps{
    type:String;
};
// Create Concession Type
export const createConcessionType = async ({type}:CreateConcessionTypeProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the concession type already exists
        const existingConcessionType = await ConcessionType.findOne({type, session:activeSession?.year_name});
        if(existingConcessionType){
            throw new Error('Concession type already exists');
        };


        // Creating new concession type
        const newConcessionType = await ConcessionType.create({session:activeSession?.year_name, type});
        newConcessionType.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Concession Type: ${err.message}`);
    }
};





// Fetch concessions Types
export const fetchConcessionsTypes = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching concessions types
        const concessionsTypes = await ConcessionType.find({session:activeSession?.year_name});
        return concessionsTypes;

    } catch (err:any) {
        throw new Error(`Error fetching concessions types: ${err}`);
    }
};





// Modify Concession type Props
interface ModifyConcessionTypeProps{
    id:String;
    type:String;
}
// Modify concession type with id
export const modifyConcessionType = async ({id, type}:ModifyConcessionTypeProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the concession type already exists
        const concessionsTypes = await ConcessionType.find({session:activeSession?.year_name});
        const existingConcessionType = await ConcessionType.findById(id);
        if(existingConcessionType.type !== type && concessionsTypes.map(i => i.type).includes(type)){throw new Error('Concession type already exists')};


        // Update concession type
        await ConcessionType.findByIdAndUpdate(
            id,
            {
                type
            },
            {new:true}
        );


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating concession type: ${err}`);
    }
};





// Delete concession type
export const deleteConcessionType = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting concession type
        await ConcessionType.findByIdAndDelete(id);
        return 'Concession Type Deleted';

    } catch (err) {
        throw new Error(`Error deleting concession type: ${err}`);      
    }
};