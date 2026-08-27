// Import
import mongoose from 'mongoose';





// Enquiry Schema
const EnquirySchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        enquiry_no:{type:String},
        enquiry_date:{type:Date},
        visitor_name:{type:String, required:true},
        visitor_address:{type:String, required:true},
        mobile_no:{type:Number, required:true},
        purpose_is_admission:{type:Boolean},
        student_name:{type:String},
        class_name:{type:String},
        reason_to_visit:{type:String},
        contact_person:{type:String},
        reference_details:{type:String}
    },
    {
        timestamps:true
    }
);





// Export
const Enquiry = (mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema)) as mongoose.Model<any>;
export default Enquiry;