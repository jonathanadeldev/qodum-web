// Import
import mongoose from 'mongoose';





// Enquiry no setting schema
const EnquiryNoSettingSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        enquiry_no_setting_should_be:{type:String, required:true},
        prefix:{type:String, required:true},
        start_from:{type:Number, required:true},
        lead_zero:{type:String, required:true},
        suffix:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const EnquiryNoSetting = (mongoose.models.EnquiryNoSetting || mongoose.model('EnquiryNoSetting', EnquiryNoSettingSchema)) as mongoose.Model<any>;
export default EnquiryNoSetting;