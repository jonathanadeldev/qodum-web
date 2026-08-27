// Import
import mongoose from 'mongoose';





// Wing Schema
const WingSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        wing:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Wing = (mongoose.models.Wing || mongoose.model('Wing', WingSchema)) as mongoose.Model<any>;
export default Wing;