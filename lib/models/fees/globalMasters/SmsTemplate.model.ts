// Import
import mongoose from 'mongoose';





// Sms template schema
const SmsTemplateSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        sms_type:{type:String, required:true},
        sms_template:{type:String, required:true},
        is_enable:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const SmsTemplate = (mongoose.models.SmsTemplate || mongoose.model('SmsTemplate', SmsTemplateSchema)) as mongoose.Model<any>;
export default SmsTemplate;