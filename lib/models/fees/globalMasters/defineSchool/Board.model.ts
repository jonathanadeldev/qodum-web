// Import
import mongoose from 'mongoose';





// Board Schema
const BoardSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        board:{type:String, required:true},
        is_default:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Board = (mongoose.models.Board || mongoose.model('Board', BoardSchema)) as mongoose.Model<any>;
export default Board;