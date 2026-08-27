// Import
import mongoose from 'mongoose';





// BloodGroup Schema
const BloodGroupSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        blood_group:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const BloodGroup = (mongoose.models.BloodGroup || mongoose.model('BloodGroup', BloodGroupSchema)) as mongoose.Model<any>;
export default BloodGroup;