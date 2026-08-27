// Import
import mongoose from 'mongoose';





// Head Schema
const HeadSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true},
        print_name:{type:String, required:true},
        pay_schedule:{type:String, required:true},
        priority_no:{type:Number},
        type:{type:String, required:true},
        show_in_certificate:{type:Boolean},
        fee_refundable:{type:Boolean},
        affiliated_fee_type:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const Head = (mongoose.models.Head || mongoose.model('Head', HeadSchema)) as mongoose.Model<any>;
export default Head;