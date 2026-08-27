// Import
import mongoose from 'mongoose';





// Remark Schema
const RemarkSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        remark:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Remark = (mongoose.models.Remark || mongoose.model('Remark', RemarkSchema)) as mongoose.Model<any>;
export default Remark;