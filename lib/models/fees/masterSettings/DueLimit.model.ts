// Import
import mongoose from 'mongoose';





// Due Limit Schema
const DueLimitSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        class_name:{type:String},
        fee_type:{type:String},
        late_fee_on_due:{type:Boolean},
        dues_amount:{type:Number},
        is_percent:{type:Boolean},
        heads:{type:String},
        fine_waive_off_setting:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const DueLimit = (mongoose.models.DueLimit || mongoose.model('DueLimit', DueLimitSchema)) as mongoose.Model<any>;
export default DueLimit;