// Import
import mongoose from 'mongoose';





// Prospectus Schema
const ProspectusSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        class_name:{type:String, required:true},
        board:{type:String},
        reg_no:{type:Number, required:true},
        date:{type:Date},
        student_name:{type:String, required:true},
        student_middle_name:{type:String},
        student_last_name:{type:String},
        reference:{type:String},
        date_of_birth:{type:Date},
        gender:{type:String, required:true},
        father_name:{type:String, required:true},
        father_middle_name:{type:String},
        father_last_name:{type:String},
        mother_name:{type:String},
        mother_middle_name:{type:String},
        mother_last_name:{type:String},
        con_person:{type:String},
        con_mobile:{type:Number, required:true},
        con_email:{type:String},
        h_no_and_streets:{type:String},
        state:{type:String},
        city:{type:String},
        pin_code:{type:String},
        stationaries:[{type:String}],
        paymode:{
            name:{type:String},
            cheque_no:{type:Number},
            cheque_date:{type:Date},
            cheque_bank:{type:String},
            branch_name:{type:String},
            deposit_bank:{type:String},
            dd_no:{type:Number}
        },
        is_online:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Prospectus = (mongoose.models.Prospectus || mongoose.model('Prospectus', ProspectusSchema)) as mongoose.Model<any>;
export default Prospectus;