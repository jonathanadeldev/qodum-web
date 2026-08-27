// Import
import mongoose from 'mongoose';





// Category Schema
const CategorySchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        category_name:{type:String, required:true},
        is_default:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Category = (mongoose.models.Category || mongoose.model('Category', CategorySchema)) as mongoose.Model<any>;
export default Category;