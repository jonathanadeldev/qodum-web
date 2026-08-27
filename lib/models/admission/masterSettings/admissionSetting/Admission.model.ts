// Import
import mongoose from 'mongoose';





// Admission Schema
const AdmissionSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        school:{type:String, required:true},
        class_name:{type:String, required:true},
        board:{type:String},
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
const Admission = (mongoose.models.Admission || mongoose.model('Admission', AdmissionSchema)) as mongoose.Model<any>;
export default Admission;