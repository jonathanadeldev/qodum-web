'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import FinancialYear from '@/lib/models/accounts/globalMasters/defineSession/FinancialYear.model';





// Create Academic Year Props
interface CreateAcademicYearProps{
    year_name:String;
    start_date:{
        day:String,
        month:String,
        year:String
    };
    end_date:{
        day:String,
        month:String,
        year:String
    };
    is_active:Boolean;
};
// Create Academic Year
export const createAcademicYear = async ({year_name, start_date, end_date, is_active}:CreateAcademicYearProps) => {
    try {

    
        // Database connection
        await connectToDb('accounts');


        // Checking if the year name already exists
        const existingYear = await AcademicYear.findOne({year_name});
        if(existingYear){
            throw new Error('Academic year already exists');
        };


        // Creating new academic year
        const newAcademicYear = await AcademicYear.create({
            year_name,
            start_date:{
                day:start_date.day,
                month:start_date.month,
                year:start_date.year
            },
            end_date:{
                day:end_date.day,
                month:end_date.month,
                year:end_date.year
            },
            is_active
        });


        // Checking if the it is active and setting all the other records to false if so
        if(is_active === true){
            newAcademicYear.save();
            await AcademicYear.updateMany({'_id': {$ne:newAcademicYear._id}}, {is_active:false});
        }else{
            newAcademicYear.save();
        };


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Academic Year: ${err.message}`);
    }
};





// Fetch Academic Years
export const fetchAcademicYears = async () => {
    try {

        // Db connection
        await connectToDb('accounts');


        // Fetching
        const academicYears = await AcademicYear.find().lean();
        return JSON.parse(JSON.stringify(academicYears));



    } catch (err:any) {
        throw new Error(`Error fetching academic years: ${err}`);
    }
};





// Fetch Academic Years
export const fetchAcademicYearsForDashboard = async () => {
    try {

        // Db connection
        await connectToDb('accounts');


        // Active financial year
        const financialYear = await FinancialYear.findOne({is_active:true}).lean();


        // Fetching
        const academicYears = await AcademicYear.find().lean();
        return JSON.parse(JSON.stringify({
            academicYears,
            activeFinancialYear: financialYear
        }));



    } catch (err:any) {
        throw new Error(`Error fetching academic years: ${err}`);
    }
};





// Fetch active academic year
export const fetchActiveAcademicYear = async () => {
    try {

        // Db connection
        await connectToDb('accounts');


        // Fetching
        const academicYear = await AcademicYear.findOne({is_active:true}).lean();
        const activeAcademicYearRes = JSON.parse(JSON.stringify(academicYear));


        // Return
        return activeAcademicYearRes;

    } catch (err:any) {
        throw new Error(`Error fetching academic years: ${err}`);
    }
};





// Modify Academic Years Props
interface ModifyAcademicYearsProps{
    id:String;
    year_name:String;
    start_date:{
        day:String,
        month:String,
        year:String
    };
    end_date:{
        day:String,
        month:String,
        year:String
    };
    is_active:Boolean;
}
// Modify Academic Years with id
export const modifyAcademicYears = async ({id, year_name, start_date, end_date, is_active}:ModifyAcademicYearsProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Checking if the year name already exists
        const academicYears = await AcademicYear.find();
        const existingYear = await AcademicYear.findById(id);
        if(existingYear?.year_name !== year_name && academicYears.map(year => year?.year_name).includes(year_name)){throw new Error('Academic year already exists')};


        if(is_active === true){
            // Update Academic Year
            await AcademicYear.findByIdAndUpdate(
                id,
                {
                    year_name,
                    start_date:{
                        day:start_date.day,
                        month:start_date.month,
                        year:start_date.year
                    },
                    end_date:{
                        day:end_date.day,
                        month:end_date.month,
                        year:end_date.year
                    },
                    is_active,
                },
                {new:true}
            ).then(async () => {
                try {
                    await AcademicYear.updateMany({'_id': {$ne:id}}, {is_active:false});
                } catch (err:any) {
                    console.log(`Error updating other years: ${err.message}`);
                }
            });;
            return 'Updated';
        }else{
            // Update Academic Year with setting other years is active to false
            await AcademicYear.findByIdAndUpdate(
                id,
                {
                    year_name,
                    start_date:{
                        day:start_date.day,
                        month:start_date.month,
                        year:start_date.year
                    },
                    end_date:{
                        day:end_date.day,
                        month:end_date.month,
                        year:end_date.year
                    },
                    is_active,
                },
                {new:true}
            );
            return 'Updated';
        };

    } catch (err) {
        throw new Error(`Error updating academic year: ${err}`);
    }
};





// Modify Academic Years With Year Name Props
interface ModifyAcademicYearWithYearNameProps{
    year_name:String;
};
// Modify Academic With Year Name For top bar active academic year setting
export const modifyAcademicYearWithYearName = async ({year_name}:ModifyAcademicYearWithYearNameProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Update Academic Year
        const updatedAcademicYear = await AcademicYear.findOneAndUpdate(
            {
                year_name
            },
            {
                is_active:true,
            },
            {new:true}
        ).then(async () => {
            try {
                await AcademicYear.updateMany({'year_name': {$ne:year_name}}, {is_active:false});
            } catch (err:any) {
                console.log(`Error updating other years: ${err.message}`);
            }
        });


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating academic year: ${err}`);
    }
};





// Delete Academic Year
export const deleteAcademicYear = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting Academic Year
        await AcademicYear.findByIdAndDelete(id);
        return 'Academic Year Deleted';

    } catch (err) {
        throw new Error(`Error deleting academic year: ${err}`);      
    }
};





// Create Academic Years
export const createAcademicYears = async ({academic_years}:any) => {
    try {

    
        // Database connection
        await connectToDb('accounts');


        // Creating new academic years
        await AcademicYear.insertMany(academic_years);


        // Return
        return 'Created';
        
    } catch (err:any) {
        console.log(`Error Creating Academic Year: ${err.message}`);
    }
};