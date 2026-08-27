// Import
import mongoose from 'mongoose';





// Admission guideline schema
const AdmissionGuidlineSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        guidelines:{type:String},
    },
    {
        timestamps:true
    }
);





// Export
const AdmissionGuideline = (mongoose.models.AdmissionGuideline || mongoose.model('AdmissionGuideline', AdmissionGuidlineSchema)) as mongoose.Model<any>;
export default AdmissionGuideline;