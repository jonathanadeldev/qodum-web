// Import
import mongoose from 'mongoose';





// Vehicle Details Schema
const VehicleDetailsSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        vehicle_owner:{type:String},
        vehicle_type:{type:String, required:true},
        vehicle_name:{type:String, required:true},
        vehicle_reg_no:{type:String, required:true},
        driver_name:{type:String},
        attendent_name:{type:String},
        fule_type:{type:String},
        seating_capacity:{type:Number},
        reserved_seats:{type:Number},
        facility_in_bus:{
            cctv:{type:Boolean},
            wifi:{type:Boolean},
            gps:{type:Boolean},
            ac:{type:Boolean}
        },
        driver_mobile_no:{type:String},
        gps_no:{type:String},
        service_due_date:{type:Date},
        insurance_due_date:{type:Date},
        vendor:{type:String},

        // Routes
        routes:{type:Array}
    },
    {
        timestamps:true
    }
);





// Export
const VehicleDetails = (mongoose.models.VehicleDetails || mongoose.model('VehicleDetails', VehicleDetailsSchema)) as mongoose.Model<any>;
export default VehicleDetails;