// Import
import mongoose from 'mongoose';





// Religion Schema
const ReligionSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        religion_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Religion = (mongoose.models.Religion || mongoose.model('Religion', ReligionSchema)) as mongoose.Model<any>;
export default Religion;