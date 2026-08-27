// Import
import mongoose from 'mongoose';





// Health Master Schema
const HealthMasterSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        health_parameter:{type:String, required:true},
        unit:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const HealthMaster = (mongoose.models.HealthMaster || mongoose.model('HealthMaster', HealthMasterSchema)) as mongoose.Model<any>;
export default HealthMaster;