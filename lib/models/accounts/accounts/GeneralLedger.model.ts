// Import
import mongoose from 'mongoose';





// General Ledger Schema
const GeneralLedgerSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        account_name:{type:String, required:true},
        group:{type:String, required:true},
        account_type:{type:String, required:true},
        opening_balance:{type:Number},
        opening_balance_type:{type:String},
        assign_date:{type:Date},
        is_cash_book:{type:Boolean},
        is_fixed_asset:{type:Boolean},
        depreciation:{type:Number},
    },
    {
        timestamps:true
    }
);





// Export
const GeneralLedger = (mongoose.models.GeneralLedger || mongoose.model('GeneralLedger', GeneralLedgerSchema)) as mongoose.Model<any>;
export default GeneralLedger;