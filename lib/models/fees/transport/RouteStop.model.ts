// Import
import mongoose from 'mongoose';





// Route Stop Schema
const RouteStopSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        route_no:{type:String, required:true},
        stop_no:{type:String, required:true},
        stop_name:{type:String, required:true},
        morning_arrival_time:{
            hour:{type:String},
            minute:{type:String},
            meridiem:{type:String}
        },
        afternoon_arrival_time:{
            hour:{type:String},
            minute:{type:String},
            meridiem:{type:String}
        },
        transport_groups:{
            jan:{type:String},
            feb:{type:String},
            mar:{type:String},
            apr:{type:String},
            may:{type:String},
            jun:{type:String},
            jul:{type:String},
            aug:{type:String},
            sep:{type:String},
            oct:{type:String},
            nov:{type:String},
            dec:{type:String}
        }
    },
    {
        timestamps:true
    }
);





// Export
const RouteStop = (mongoose.models.RouteStop || mongoose.model('RouteStop', RouteStopSchema)) as mongoose.Model<any>;
export default RouteStop;