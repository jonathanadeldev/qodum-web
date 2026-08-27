'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Installment from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeInstallment.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Is session transfered
export const isInstallmentsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await Installment.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Installment session transfer
export const installmentsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        // TODO: transfer


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create Installment Props
interface CreateInstallmentProps{
    name:String;
    print_name:String;
    preference_no:Number;
    due_on_date:{
        day:String,
        month:String,
        year:String
    };
    due_date:{
        day:String,
        month:String,
        year:String
    };
    months:string[];
};
// Create Installment Year
export const createInstallment = async ({name, print_name, preference_no, due_on_date, due_date, months}:CreateInstallmentProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the installment name already exists
        const existingInstallment = await Installment.findOne({name, session:activeSession?.year_name});
        if(existingInstallment){
            throw new Error('Installment name already exists');
        };


        // Checking if the preference no. already exists
        const installments = await Installment.find({session:activeSession?.year_name});
        if(installments.map((installment:any) => installment.preference_no).includes(preference_no)){
            throw new Error('Preference number already exists');
        };


        // Creating new installment
        const newInstallment = await Installment.create({
            session:activeSession?.year_name,
            name,
            print_name,
            preference_no,
            due_on_date:{
                day:due_on_date.day,
                month:due_on_date.month,
                year:due_on_date.year
            },
            due_date:{
                day:due_date.day,
                month:due_date.month,
                year:due_date.year
            }
        });
        newInstallment.save().then(async () => {
            await Installment.findOneAndUpdate({name, session:activeSession?.year_name}, {months});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Installment: ${err.message}`);
    }
};





// Fetch Installments
export const fetchInstallments = async (pageNumber = 1, pageSize=20) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching installments
        const installments = await Installment.find({session:activeSession?.year_name});
        return JSON.parse(JSON.stringify(installments));

    } catch (err:any) {
        throw new Error(`Error fetching installments: ${err}`);
    }
};





// Modify Installment Props
interface ModifyInstallmentProps{
    id:String;
    name:String;
    print_name:String;
    preference_no:Number;
    due_on_date:{
        day:String,
        month:String,
        year:String
    };
    due_date:{
        day:String,
        month:String,
        year:String
    };
    months:String[];
}
// Modify Installment with id
export const modifyInstallment = async ({id, name, print_name, preference_no, due_on_date, due_date, months}:ModifyInstallmentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the year name already exists
        const installments = await Installment.find({session:activeSession?.year_name});
        const existingInstallment = await Installment.findById(id);
        if(existingInstallment.name !== name && installments.map(i => i.name).includes(name)){throw new Error('Installment name already exists')};

        // Checking if the preference number already exists
        if(existingInstallment.preference_no !== preference_no && installments.map(i => i.preference_no).includes(preference_no)){throw new Error('Preference number already exists')};


        // Update installment
        await Installment.findByIdAndUpdate(
            id,
            {
                name,
                print_name,
                preference_no,
                due_on_date:{
                    day:due_on_date.day,
                    month:due_on_date.month,
                    year:due_on_date.year
                },
                due_date:{
                    day:due_date.day,
                    month:due_date.month,
                    year:due_date.year
                },
                months
            },
            {new:true}
        );


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating installment: ${err}`);
    }
};





// Delete Insallment
export const deleteInstallment = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting installment
        await Installment.findByIdAndDelete(id);
        return 'Installment Deleted';

    } catch (err) {
        throw new Error(`Error deleting installment: ${err}`);      
    }
};





// Create installments
export const createInstallments = async ({installments}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Installments insert array
        const installmentsInsertArray = installments.map((i:any) => {
            return{
                session:activeSession.year_name,
                ...i,
                due_on_date:{
                    ...i.due_on_date,
                    year:installments.length > 4
                        ? installments.indexOf(i) <= 8 ? activeSession.year_name.split('-')[0] : activeSession.year_name.split('-')[1]
                        : installments.indexOf(i) <= 2 ? activeSession.year_name.split('-')[0] : activeSession.year_name.split('-')[1]
                },
                due_date:{
                    ...i.due_date,
                    year:installments.length > 4
                        ? installments.indexOf(i) <= 8 ? activeSession.year_name.split('-')[0] : activeSession.year_name.split('-')[1]
                        : installments.indexOf(i) <= 2 ? activeSession.year_name.split('-')[0] : activeSession.year_name.split('-')[1]
                },
            };
        });


        // Creating new installment
        await Installment.insertMany(installmentsInsertArray);


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error Creating Installment: ${err.message}`);
    }
};