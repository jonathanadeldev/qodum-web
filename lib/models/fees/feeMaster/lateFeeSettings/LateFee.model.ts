// Import
import mongoose from 'mongoose';





// Late fee schema
const LateFeeSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        fee_group:{type:String, required:true},
        fee_type:{type:String},
        installment:{type:String},
        due_date:{type:Date},
        late_fee_type:{type:String},
        amount:{type:Number}
    },
    {
        timestamps:true
    }
);





// Export
const LateFee = (mongoose.models.LateFee || mongoose.model('LateFee', LateFeeSchema)) as mongoose.Model<any>;
export default LateFee;