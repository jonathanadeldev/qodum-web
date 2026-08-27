// Import
import mongoose from 'mongoose';





// Cadet type Schema
const CadetTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const CadetType = (mongoose.models.CadetType || mongoose.model('CadetType', CadetTypeSchema)) as mongoose.Model<any>;
export default CadetType;