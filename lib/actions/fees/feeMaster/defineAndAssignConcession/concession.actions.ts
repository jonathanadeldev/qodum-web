'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Concession from '@/lib/models/fees/feeMaster/defineAndAssignConcession/Concession.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isConcessionsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await Concession.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Concession type session transfer
export const concessionsSesssionTransfer = async ({next_session}:any) => {
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





// Create Concession Props
interface CreateConcessionProps{
    name:String;
};
// Create Concession Year
export const createConcession = async ({name}:CreateConcessionProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the concession name already exists
        const existingConcession = await Concession.findOne({name, session:activeSession?.year_name});
        if(existingConcession){
            throw new Error('Concession name already exists');
        };


        // Creating new concession
        const newConcession = await Concession.create({session:activeSession?.year_name, name});
        newConcession.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Concession: ${err.message}`);
    }
};





// Fetch concessions
export const fetchConcessions = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching concessions
        const concessions = await Concession.find({session:activeSession?.year_name});
        return concessions;

    } catch (err:any) {
        throw new Error(`Error fetching concessions: ${err}`);
    }
};





// Modify Concession Props
interface ModifyConcessionProps{
    id:String;
    name:String;
}
// Modify concession with id
export const modifyConcession = async ({id, name}:ModifyConcessionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the concession name already exists
        const concessions = await Concession.find({session:activeSession?.year_name});
        const existingConcession = await Concession.findById(id);
        if(existingConcession.name !== name && concessions.map(i => i.name).includes(name)){throw new Error('Concession name already exists')};


        // Update concession
        await Concession.findByIdAndUpdate(
            id,
            {
                name
            },
            {new:true}
        );


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating concession: ${err}`);
    }
};





// Delete concession
export const deleteConcession = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting concession
        await Concession.findByIdAndDelete(id);
        return 'Concession Deleted';

    } catch (err) {
        throw new Error(`Error deleting concession: ${err}`);      
    }
};