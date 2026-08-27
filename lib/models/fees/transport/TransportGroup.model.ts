// Import
import mongoose from 'mongoose';





// Transport Group Schema
const TransportGroupSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        distance_name:{type:String, required:true},
        distance_amount:{type:Number, required:true},
        distance_from:{type:Number},
        distance_to:{type:Number},
        transport_term:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const TransportGroup = (mongoose.models.TransportGroup || mongoose.model('TransportGroup', TransportGroupSchema)) as mongoose.Model<any>;
export default TransportGroup;