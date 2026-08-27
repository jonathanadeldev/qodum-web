// Import
import mongoose from 'mongoose';





// Staff document schema
const staffDocumentSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        document_type:{type:String, required:true},
        document_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const StaffDocument = (mongoose.models.StaffDocument || mongoose.model('StaffDocument', staffDocumentSchema)) as mongoose.Model<any>;
export default StaffDocument;