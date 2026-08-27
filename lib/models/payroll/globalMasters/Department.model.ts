// Import
import mongoose from 'mongoose';





// Department Schema
const DepartmentSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        department:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Department = (mongoose.models.Department || mongoose.model('Department', DepartmentSchema)) as mongoose.Model<any>;
export default Department;