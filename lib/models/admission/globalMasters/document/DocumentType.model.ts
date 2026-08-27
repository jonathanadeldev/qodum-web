// Import
import mongoose from 'mongoose';





// Documnent type schema
const DocumentTypeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        document_type:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const DocumentType = (mongoose.models.DocumentType || mongoose.model('DocumentType', DocumentTypeSchema)) as mongoose.Model<any>;
export default DocumentType;