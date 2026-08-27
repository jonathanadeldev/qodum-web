// Import
import mongoose from 'mongoose';





// Optional Subject Schema
const OptionalSubjectSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        subject_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const OptionalSubject = (mongoose.models.OptionalSubject || mongoose.model('OptionalSubject', OptionalSubjectSchema)) as mongoose.Model<any>;
export default OptionalSubject;