// Import
import mongoose from 'mongoose';





// Stationary Details Schema
const StationaryDetailsSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        stationary_name:{type:String, required:true},
        amount:{type:Number, required:true},
        account_name:{type:String, required:true},
        school_name:{type:String, required:true},
        is_online:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const StationaryDetails = (mongoose.models.StationaryDetails || mongoose.model('StationaryDetails', StationaryDetailsSchema)) as mongoose.Model<any>;
export default StationaryDetails;