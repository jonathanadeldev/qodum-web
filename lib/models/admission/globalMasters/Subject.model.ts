// Import
import mongoose from 'mongoose';





// Subject Schema
const SubjectSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        subject_name:{type:String, required:true},
        available_seats:{type:Number},
        is_university:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Subject = (mongoose.models.Subject || mongoose.model('Subject', SubjectSchema)) as mongoose.Model<any>;
export default Subject;