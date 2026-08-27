// Import
import mongoose from 'mongoose';





// Caste Schema
const CasteSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        caste_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Caste = (mongoose.models.Caste || mongoose.model('Caste', CasteSchema)) as mongoose.Model<any>;
export default Caste;