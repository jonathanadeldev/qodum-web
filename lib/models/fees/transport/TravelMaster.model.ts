// Import
import mongoose from 'mongoose';





// Travel Master Schema
const TravelMasterSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        travel_agency_name:{type:String, required:true},
        mobile_no:{type:Number, required:true},
        mail_id:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const TravelMaster = (mongoose.models.TravelMaster || mongoose.model('TravelMaster', TravelMasterSchema)) as mongoose.Model<any>;
export default TravelMaster;