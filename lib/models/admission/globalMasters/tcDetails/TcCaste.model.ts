// Import
import mongoose from 'mongoose';





// Tc Caste Schema
const TcCasteSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        caste_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const TcCaste = (mongoose.models.TcCaste || mongoose.model('TcCaste', TcCasteSchema)) as mongoose.Model<any>;
export default TcCaste;