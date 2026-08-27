// Import
import mongoose from 'mongoose';





// Nationality Schema
const NationalitySchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Nationality = (mongoose.models.Nationality || mongoose.model('Nationality', NationalitySchema)) as mongoose.Model<any>;
export default Nationality;