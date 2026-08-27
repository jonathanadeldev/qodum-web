// Import
import mongoose from 'mongoose';





// Installment Schema
const InstallmentSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        name:{type:String, required:true},
        print_name:{type:String, required:true},
        preference_no:{type:Number, required:true},
        due_on_date:{
            day:{type:String, required:true},
            month:{type:String, required:true},
            year:{type:String, required:true},
        },
        due_date:{
            day:{type:String, required:true},
            month:{type:String, required:true},
            year:{type:String, required:true},
        },
        months:[{type:String, max:13}]
    },
    {
        timestamps:true
    }
);





// Export
const Installment = (mongoose.models.Installment || mongoose.model('Installment', InstallmentSchema)) as mongoose.Model<any>;
export default Installment;