'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import VehicleRoute from '@/lib/models/fees/transport/VehicleRoute.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isVehicleRoutesSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await VehicleRoute.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Vehicle routes session transfer
export const vehiclesRoutesSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await VehicleRoute.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create vehicle route props
interface CreateVehicleRouteProps{
    route_no:String;
    route_description:String;
    route_in_charge_name:String;
    route_in_charge_mobile_no:Number;
};
// Create vehicle route
export const createVehicleRoute = async ({route_no, route_description, route_in_charge_name, route_in_charge_mobile_no}:CreateVehicleRouteProps) => {
    try {

    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the route no. already exists
        const existingVehicleRoute = await VehicleRoute.findOne({route_no, session:activeSession?.year_name});
        if(existingVehicleRoute){
            throw new Error('Vehicle route already exists');
        };


        // Creating new vehicle route
        const newVehicleRoute = await VehicleRoute.create({session:activeSession?.year_name, route_no, route_description, route_in_charge_name, route_in_charge_mobile_no});
        newVehicleRoute.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Vehicle Route: ${err.message}`);
    }
};





// Fetch vehicle routes
export const fetchVehicleRoutes = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching vehicle routes
        const vehicleRoutes = await VehicleRoute.find({session:activeSession?.year_name});
        return vehicleRoutes;

    } catch (err:any) {
        throw new Error(`Error fetching vehicle routes: ${err}`);
    }
};





// Modify vehecle routes props
interface ModifyVehicleRoutesProps{
    id:String;
    route_no:String;
    route_description:String;
    route_in_charge_name:String;
    route_in_charge_mobile_no:Number;
}
// Modify vehicle route
export const modifyVehicleRoute = async ({id, route_no, route_description, route_in_charge_name, route_in_charge_mobile_no}:ModifyVehicleRoutesProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the route no. exists
        const vehicleRoutes = await VehicleRoute.find({session:activeSession?.year_name});
        const existingVehicleRoute = await VehicleRoute.findById(id);
        if(existingVehicleRoute.route_no !== route_no && vehicleRoutes.map(i => i.route_no).includes(route_no)){throw new Error('Vehicle route no. already exists')};


        // Update vehicle route
        const updatedVehicleRoute = await VehicleRoute.findByIdAndUpdate(id, {route_no, route_description, route_in_charge_name, route_in_charge_mobile_no}, {new:true});


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating vehicle route: ${err}`);
    }
};





// Delete vehicle route
export const deleteVehicleRoute = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting vehicle route
        await VehicleRoute.findByIdAndDelete(id);
        return 'Vehicle route deleted';

    } catch (err) {
        throw new Error(`Error deleting vehicle route: ${err}`);      
    }
};