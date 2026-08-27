// Import
import mongoose from 'mongoose';





// Late fee head wise schema
const LateFeeHeadWiseSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        fee_group:{type:String, required:true},
        fee_type:{type:String},
        installment:{type:String},
        head:{type:String},
        due_date:{type:Date},
        late_fee_type:{type:String},
        amount:{type:Number}
    },
    {
        timestamps:true
    }
);





// Export
const LateFeeHeadWise = (mongoose.models.LateFeeHeadWise || mongoose.model('LateFeeHeadWise', LateFeeHeadWiseSchema)) as mongoose.Model<any>;
export default LateFeeHeadWise;