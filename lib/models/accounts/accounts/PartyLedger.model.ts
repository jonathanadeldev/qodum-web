// Import
import mongoose from 'mongoose';





// Party Ledger Schema
const PartyLedgerSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        account_name:{type:String, required:true},
        account_no:{type:Number, required:true},
        cin_no:{type:Number},
        group:{type:String, required:true},
        account_type:{type:String, required:true},
        account_address:{type:String},
        account_city:{type:String},
        pin_code:{type:Number},
        email:{type:String},
        mobile:{type:Number},
        pan:{type:String},
        gstin:{type:String},
        opening_balance:{type:Number},
        opening_balance_type:{type:String},
        assign_date:{type:Date},
    },
    {
        timestamps:true
    }
);





// Export
const PartyLedger = (mongoose.models.PartyLedger || mongoose.model('PartyLedger', PartyLedgerSchema)) as mongoose.Model<any>;
export default PartyLedger;