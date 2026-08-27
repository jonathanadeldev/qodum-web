// Import
import mongoose from 'mongoose';





// Class Schema
const ClassSchema = new mongoose.Schema(
    {
        class_name:{type:String, required:true},
        wing_name:{type:String, required:true},
        school:{type:String, required:true},
        order:{type:Number, required:true},
        sections:[String],
        affiliated_heads:{
            group_name:{type:String},
            heads:{type:Array}
        },
        affiliated_special_heads:{
            group_name:{type:String},
            heads:{type:Array}
        },
        is_admission_opened:{type:Boolean}
    },
    {
        timestamps:true
    }
);





// Export
const Class = (mongoose.models.Class || mongoose.model('Class', ClassSchema)) as mongoose.Model<any>;
export default Class;