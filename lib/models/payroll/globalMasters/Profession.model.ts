// Import
import mongoose from 'mongoose';





// Profession Schema
const ProfessionSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        profession:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Profession = (mongoose.models.Profession || mongoose.model('Profession', ProfessionSchema)) as mongoose.Model<any>;
export default Profession;