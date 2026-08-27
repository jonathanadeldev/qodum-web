// Import
import mongoose from 'mongoose';





// School global details Schema
const SchoolGlobalDetailsSchema = new mongoose.Schema(
        {
            logo:{type:String},
            school_main:{type:Boolean},
            school_subheads:{type:Boolean},
            school_name:{type:String, required:true},
            school_address:{type:String, required:true},
            school_address_2:{type:String},
            school_short_name:{type:String},
            contact_no:{type:String},
            mobile:{type:String},
            email:{type:String},
            support_email_id:{type:String},
            website:{type:String},
            prefix:{type:String, required:true},
            iso_details:{type:String},
            principal_signature:{type:String},
            accountant_signature:{type:String},
            school_no:{type:String},
            affiliation_to:{type:String},
            affiliation_no:{type:String},
            udise_code:{type:String},
            pen:{type:String},
            associates:{type:String},
            renew_up_to:{type:String},
            school_status:{type:String},
            working_days:{type:String},
            recess:{type:String},
            total_period:{type:String},
            academic_year:{type:String},
            financial_year:{type:String},
            facebook_link:{type:String},
            linkedin_link:{type:String},
            twitter_link:{type:String},
            instagram_link:{type:String}
        },
        {
            timestamps:true
        }
    );





// Export
const SchoolGlobalDetails = (mongoose.models.SchoolGlobalDetails || mongoose.model('SchoolGlobalDetails', SchoolGlobalDetailsSchema)) as mongoose.Model<any>;
export default SchoolGlobalDetails;