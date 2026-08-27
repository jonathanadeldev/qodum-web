'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import TransportGroup from '@/lib/models/fees/transport/TransportGroup.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isTransportGroupSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await TransportGroup.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Transport groups session transfer
export const transportGroupsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await TransportGroup.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create Transport Group Props
interface CreateTransportGroupProps{
    distance_name:String;
    distance_amount:Number;
    distance_from:Number;
    distance_to:Number;
    transport_term:String;
};
// Create transport group
export const createTransportGroup = async ({distance_name, distance_amount, distance_from, distance_to, transport_term}:CreateTransportGroupProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the distance name already exists
        const existingTransportGroup = await TransportGroup.findOne({distance_name, session:activeSession?.year_name});
        if(existingTransportGroup){
            throw new Error('Distance name already exists');
        };


        // Creating new transport group
        const newTranportGroup = await TransportGroup.create({session:activeSession?.year_name, distance_name, distance_amount, distance_from, distance_to, transport_term});
        newTranportGroup.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error creating transport group: ${err.message}`);
    };
};





// Fetch transport groups
export const fetchTransportGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const transportGroups = await TransportGroup.find({session:activeSession?.year_name});
        return transportGroups;

    } catch (err:any) {
        throw new Error(`Error fetching transport groups: ${err}`);
    };
};




// Modify transport groups props
interface ModifyTransportGroupProps{
    id:String;
    distance_name:String;
    distance_amount:Number;
    distance_from:Number;
    distance_to:Number;
    transport_term:String;
};
// Modify transport group
export const modifyTransportGroup = async ({id, distance_name, distance_amount, distance_from, distance_to, transport_term}:ModifyTransportGroupProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the distance name already exists
        const transportGroups = await TransportGroup.find({session:activeSession?.year_name});
        const existingTransportGroup = await TransportGroup.findById(id);
        if(existingTransportGroup.distance_name !== distance_name && transportGroups.map(i => i.distance_name).includes(distance_name)){throw new Error('Distance name already exists')};


        // Updating transport group
        await TransportGroup.findByIdAndUpdate(id, {distance_name, distance_amount, distance_from, distance_to, transport_term}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating transport group: ${err}`);
    };
};





// Delete transport group
export const deleteTransportGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting transport group
        await TransportGroup.findByIdAndDelete(id);
        return 'Transport group deleted';

    } catch (err) {
        throw new Error(`Error deleting transport group: ${err}`);      
    };
};