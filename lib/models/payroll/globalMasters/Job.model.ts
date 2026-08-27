// Import
import mongoose from 'mongoose';





// Job Schema
const JobSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        post:{type:String, required:true},
        salary:{type:String, required:true},
        experience:{type:String, required:true},
        description:{type:String, required:true},
        key_skill:{type:String, required:true},
        last_date_of_submission:{type:Date, required:true},
        applications:{type:Array}
    },
    {
        timestamps:true
    }
);





// Export
const Job = (mongoose.models.Job || mongoose.model('Job', JobSchema)) as mongoose.Model<any>;
export default Job;