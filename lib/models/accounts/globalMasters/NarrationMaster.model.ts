// Import
import mongoose from 'mongoose';





// Narration Master Schema
const NarrationMasterSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        voucher_type:{type:String, required:true},
        narration:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const NarrationMaster = (mongoose.models.NarrationMaster || mongoose.model('NarrationMaster', NarrationMasterSchema)) as mongoose.Model<any>;
export default NarrationMaster;