// Import
import mongoose from 'mongoose';





// Section Schema
const SectionSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        section_name:{type:String, required:true},
        order_no:{type:Number, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Section = (mongoose.models.Section || mongoose.model('Section', SectionSchema)) as mongoose.Model<any>;
export default Section;