// Import
import mongoose from 'mongoose';





// Bank Ledger Schema
const BankLedgerSchema = new mongoose.Schema(
    {
        session:{type:String, required:true},
        account_name:{type:String, required:true},
        account_no:{type:Number, required:true},
        group:{type:String, required:true},
        account_type:{type:String},
        account_address:{type:String},
        account_city:{type:String},
        pin_code:{type:Number},
        email:{type:String},
        mobile:{type:Number},
        opening_balance:{type:Number, required:true},
        opening_balance_type:{type:String},
        assign_date:{type:Date},
    },
    {
        timestamps:true
    }
);





// Export
const BankLedger = (mongoose.models.BankLedger || mongoose.model('BankLedger', BankLedgerSchema)) as mongoose.Model<any>;
export default BankLedger;