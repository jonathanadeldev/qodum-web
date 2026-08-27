'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import VehicleType from '@/lib/models/fees/transport/VehicleType.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isVehicleTypeSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await VehicleType.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Vehicle type session transfer
export const vehicleTypesSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await VehicleType.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create vehicle type props
interface CreateVehicleTypeProps{
    vehicle_name:String;
};
// Create vehicle type
export const createVehicleType = async ({vehicle_name}:CreateVehicleTypeProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the vehicle type already exists
        const existingVehicleType = await VehicleType.findOne({vehicle_name, session:activeSession?.year_name});
        if(existingVehicleType){
            throw new Error('Vehicle type already exists');
        };


        // Creating new vehicle type
        const newVehicleType = await VehicleType.create({session:activeSession?.year_name, vehicle_name});
        newVehicleType.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Vehicle Type: ${err.message}`);
    }
};





// Fetch vehicle types
export const fetchVehicleTypes = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching vehicle types
        const vehicleTypes = await VehicleType.find({session:activeSession?.year_name});
        return vehicleTypes;

    } catch (err:any) {
        throw new Error(`Error fetching vehicle types: ${err}`);
    }
};





// Modify vehecle types props
interface ModifyVehicleTypesProps{
    id:String;
    vehicle_name:String;
}
// Modify vehicle type
export const modifyVehicleType = async ({id, vehicle_name}:ModifyVehicleTypesProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the vehicle name exists
        const vehicleTypes = await VehicleType.find({session:activeSession?.year_name});
        const existingVehicleType = await VehicleType.findById(id);
        if(existingVehicleType.vehicle_name !== vehicle_name && vehicleTypes.map(i => i.vehicle_name).includes(vehicle_name)){throw new Error('Vehicle name already exists')};


        // Update vehicle type
        await VehicleType.findByIdAndUpdate(id, {vehicle_name}, {new:true});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating vehicle name: ${err}`);
    }
};





// Delete vehicle type
export const deleteVehicleType = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting vehicle type
        await VehicleType.findByIdAndDelete(id);
        return 'Vehicle type deleted';

    } catch (err) {
        throw new Error(`Error deleting vehicle type: ${err}`);      
    }
};