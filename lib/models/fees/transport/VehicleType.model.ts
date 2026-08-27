// Import
import mongoose from 'mongoose';





// Vehicle Type Schema
const VehicleTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        vehicle_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const VehicleType = (mongoose.models.VehicleType || mongoose.model('VehicleType', VehicleTypeSchema)) as mongoose.Model<any>;
export default VehicleType;