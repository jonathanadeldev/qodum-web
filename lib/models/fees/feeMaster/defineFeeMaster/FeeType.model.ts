// Import
import mongoose from 'mongoose';





// Fee Type Schema
const FeeTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true},
        preference_no:{type:Number, required:true},
        heads:[{type:String}]
    },
    {
        timestamps:true
    }
);





// Export
const FeeType = (mongoose.models.FeeType || mongoose.model('FeeType', FeeTypeSchema)) as mongoose.Model<any>;
export default FeeType;