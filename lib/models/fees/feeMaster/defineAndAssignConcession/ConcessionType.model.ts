// Import
import mongoose from 'mongoose';





// ConcessionType Schema
const ConcessionTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        type:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const ConcessionType = (mongoose.models.ConcessionType || mongoose.model('ConcessionType', ConcessionTypeSchema)) as mongoose.Model<any>;
export default ConcessionType;