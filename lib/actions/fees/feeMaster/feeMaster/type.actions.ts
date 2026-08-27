'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Head from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeHead.model';
import FeeType from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeType.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isTypesSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await FeeType.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Group session transfer
export const typesSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await FeeType.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create type props
interface CreateTypeProps{
    name:String;
    preference_no:Number;
    heads:string[];
};
// Create Type
export const createType = async ({name, preference_no, heads}:CreateTypeProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the type name already exists
        const existingType = await FeeType.findOne({name, session:activeSession?.year_name});
        if(existingType){
            throw new Error('Fee type already exists');
        };


        // Checking if the preference no. already exists
        const types = await FeeType.find({session:activeSession?.year_name});
        if(types.map((type:any) => type.preference_no).includes(preference_no)){
            throw new Error('Preference number already exists');
        };


        // Creating new type
        const newType = await FeeType.create({
            session:activeSession?.year_name,
            name,
            preference_no
        });
        newType.save().then(async () => {
            await FeeType.findOneAndUpdate({name, session:activeSession?.year_name}, {heads});
        });


        // Updating head
        heads.map(async h => {
            await Head.updateMany({'name':h, session:activeSession?.year_name}, {affiliated_fee_type:name});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Type: ${err.message}`);
    }
};





// Fetch typess
export const fetchTypes = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching types
        const types = await FeeType.find({session:activeSession?.year_name});
        return types;

    } catch (err:any) {
        throw new Error(`Error fetching types: ${err}`);
    }
};





// Modify type props
interface ModifyTypeProps{
    id:String;
    name:String;
    preference_no:Number;
    heads:string[];
}
// Modify type with id
export const modifyType = async ({id, name, preference_no, heads}:ModifyTypeProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the year name already exists
        const types = await FeeType.find({session:activeSession?.year_name});
        const existingType = await FeeType.findById(id);
        if(existingType.name !== name && types.map(i => i.name).includes(name)){throw new Error('Fee type name already exists')};
        // Checking if the preference number already exists
        if(existingType.preference_no !== preference_no && types.map(i => i.preference_no).includes(preference_no)){throw new Error('Preference number already exists')};


        // Freeing disselected heads from fee type
        const difference = existingType.heads.filter((x:any) => !heads.includes(x));
        await Head.updateMany({'name':difference}, {affiliated_fee_type:''});


        // Update type
        await FeeType.findByIdAndUpdate(
            id,
            {
                name,
                preference_no,
                heads
            },
            {new:true}
        );


        // Updating head
        heads.map(async h => {
            await Head.updateMany({'name':h}, {affiliated_fee_type:name});
        });


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating type: ${err}`);
    }
};





// Delete type
export const deleteType = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting type
        await FeeType.findByIdAndDelete(id);
        return 'Fee type deleted';

    } catch (err) {
        throw new Error(`Error deleting fee type: ${err}`);
    }
};





// Fetching free heads
export const fetchFreeHeads = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching
        const heads = await Head.find({session:activeSession?.year_name});
        const freeHeads = heads.filter((head:any) => head.affiliated_fee_type === '' || !head.affiliated_fee_type);


        // Return
        return freeHeads;
        
    } catch (err) {
        throw new Error(`Error fetching fee heads: ${err}`);
    }
};