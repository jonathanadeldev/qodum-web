// Import
import mongoose from 'mongoose';





// CLub Schema
const ClubSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Club = (mongoose.models.Club || mongoose.model('Club', ClubSchema)) as mongoose.Model<any>;
export default Club;