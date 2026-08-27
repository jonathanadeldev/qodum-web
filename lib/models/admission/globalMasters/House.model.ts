// Import
import mongoose from 'mongoose';





// House Schema
const HouseSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        house_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const House = (mongoose.models.House || mongoose.model('House', HouseSchema)) as mongoose.Model<any>;
export default House;