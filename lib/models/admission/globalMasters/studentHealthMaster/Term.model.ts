// Import
import mongoose from 'mongoose';





// Term Schema
const TermSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        term_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Term = (mongoose.models.Term || mongoose.model('Term', TermSchema)) as mongoose.Model<any>;
export default Term;