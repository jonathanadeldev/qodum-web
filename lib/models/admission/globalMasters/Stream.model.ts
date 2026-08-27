// Import
import mongoose from 'mongoose';





// Stream Schema
const StreamSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        stream_name:{type:String, required:true}
    },
    {
        timestamps:true
    }
);





// Export
const Stream = (mongoose.models.Stream || mongoose.model('Stream', StreamSchema)) as mongoose.Model<any>;
export default Stream;