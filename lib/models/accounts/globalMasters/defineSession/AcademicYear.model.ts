// Import
import mongoose from 'mongoose';





// Academic year schema
const AcademicYearSchema = new mongoose.Schema(
        {
            year_name:{type:String, required:true, unique:true},
            start_date:{
                day:{type:String, required:true},
                month:{type:String, required:true},
                year:{type:String, required:true},
            },
            end_date:{
                day:{type:String, required:true},
                month:{type:String, required:true},
                year:{type:String, required:true},
            },
            is_active:{type:Boolean, required:true}
        },
        {
            timestamps:true
        }
    );





// Export
const AcademicYear = (mongoose.models.AcademicYear || mongoose.model('AcademicYear', AcademicYearSchema)) as mongoose.Model<any>;
export default AcademicYear;