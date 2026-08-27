// Import
import mongoose from 'mongoose';





// Slot Schema
const SlotSchema = new mongoose.Schema(
    {
        session:{type:String},
        class_name:{type:String},
        slot_name:{type:String},
        slot_date:{type:Date},
        start_time:{type:String},
        end_time:{type:String},
        applicant:{type:Number},
        alloted:{type:Number},
        students:{type:Array}
    },
    {
        timestamps:true
    }
);





// Export
const Slot = (mongoose.models.Slot || mongoose.model('Slot', SlotSchema)) as mongoose.Model<any>;
export default Slot;