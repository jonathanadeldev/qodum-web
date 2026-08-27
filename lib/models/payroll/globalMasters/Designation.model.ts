// Import
import mongoose from 'mongoose';





// Designation Schema
const DesignationSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        designation:{type:String, required:true},
        show_in_payroll:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Designation = (mongoose.models.Designation || mongoose.model('Designation', DesignationSchema)) as mongoose.Model<any>;
export default Designation;