// Import
import mongoose from 'mongoose';





// Stagg admission number schema
const StaffAdmissionNumberSchema = new mongoose.Schema(
    {
        setting_type:{type:String},
        should_be:{type:String},
        rec_no:{type:Number},
        prefix:{type:String},
        start_from:{type:Number},
        lead_zero:{type:String},
        suffix:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const StaffAdmissionNumber = (mongoose.models.StaffAdmissionNumber || mongoose.model('StaffAdmissionNumber', StaffAdmissionNumberSchema)) as mongoose.Model<any>;
export default StaffAdmissionNumber;