// Import
import mongoose from 'mongoose';





// Parish Schema
const ParishSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        parish:{type:String, required:true},
        religion:[{type:String}]
    },
    {
        timestamps:true
    }
);





// Export
const Parish = (mongoose.models.Parish || mongoose.model('Parish', ParishSchema)) as mongoose.Model<any>;
export default Parish;