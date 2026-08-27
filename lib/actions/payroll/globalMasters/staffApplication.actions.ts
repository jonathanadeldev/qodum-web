'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import StaffApplication from '@/lib/models/payroll/globalMasters/StaffApplication.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create staff application props
interface CreateStaffApplicationProps{
    // Staff registration
    staff_registration:{
        post:String;
        reg_no:String;
        approved_teacher:String;
        teacher_id:String;
        cbse_code:String;
        first_name_title:String;
        first_name:String;
        middle_name:String;
        last_name:String;
        gender:String;
        email:String;
        alternate_email:String;
        phone:Number;
        mobile:Number;
        whatsapp_mobile:Number;
        emergency_mobile:Number;
        wing:String;
        is_active:Boolean;
        profile_picture:String;
        maritial_status:String;
        qualification:String;
        date_of_birth:Date;
        date_of_anniversary:Date;
        date_of_joining:Date;
        date_of_retire:Date;
        date_of_retire_is_extend:Boolean;
        permenant_address:String;
        current_address:String;
        father_or_spouse_name:String;
        father_or_spouse_mobile:Number;
        father_or_spouse_relation:String;
        blood_group:String;
        staff_type:String;
        designation:String;
        department:String;
        religion:String;
        aadhar_card_no:Number;
    };

    // Staff educational details
    staff_educational_details:any;

    // Staff experience details
    staff_experience_details:any;

    // Staff document details
    staff_document_details:any;
};
// Create staff application
export const createStaffApplication = async ({staff_registration, staff_educational_details, staff_experience_details, staff_document_details}:CreateStaffApplicationProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the staff already exists
        const existingStaff = await StaffApplication.findOne({'staff_registration.reg_no':staff_registration.reg_no, session:activeSession?.year_name});
        if(existingStaff){
            throw new Error('Staff already exists');
        };


        // Creating new staff
        const newStaff = await StaffApplication.create({session:activeSession?.year_name, is_up_for_admission:false, staff_registration});
        newStaff.save().then(async () => {
            await StaffApplication.findOneAndUpdate({'staff_registration.reg_no':staff_registration.reg_no}, {staff_educational_details, staff_experience_details, staff_document_details});
        });


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating staff: ${err.message}`);
    };
};





// Fetch staff application
export const fetchStaffApplication = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const staff = await StaffApplication.find({session:activeSession?.year_name});


        // Return
        return staff;

    } catch (err:any) {
        throw new Error(`Error fetching staff staff: ${err}`);
    };
};





// Modify staff application props
interface ModifyStaffApplicationProps{
    id:String;
    // Staff registration
    staff_registration:{
        post:String;
        reg_no:String;
        approved_teacher:String;
        teacher_id:String;
        cbse_code:String;
        first_name_title:String;
        first_name:String;
        middle_name:String;
        last_name:String;
        gender:String;
        email:String;
        alternate_email:String;
        phone:Number;
        mobile:Number;
        whatsapp_mobile:Number;
        emergency_mobile:Number;
        wing:String;
        is_active:Boolean;
        profile_picture:String;
        maritial_status:String;
        qualification:String;
        date_of_birth:Date;
        date_of_anniversary:Date;
        date_of_joining:Date;
        date_of_retire:Date;
        date_of_retire_is_extend:Boolean;
        permenant_address:String;
        current_address:String;
        father_or_spouse_name:String;
        father_or_spouse_mobile:Number;
        father_or_spouse_relation:String;
        blood_group:String;
        staff_type:String;
        designation:String;
        department:String;
        religion:String;
        aadhar_card_no:Number;
    },

    // Staff educational details
    staff_educational_details:any;

    // Staff experience details
    staff_experience_details:any;

    // Staff document details
    staff_document_details:any;
}
// Modify staff application
export const modifyStaffApplication = async ({id, staff_registration, staff_educational_details, staff_experience_details, staff_document_details}:ModifyStaffApplicationProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the staff already exists
        const staff = await StaffApplication.find({session:activeSession?.year_name});
        const existingStaff = await StaffApplication.findById(id);
        if(existingStaff.staff_registration.reg_no !== staff_registration.reg_no && staff.map(s => s.staff_registration.reg_no).includes(staff_registration.reg_no)){throw new Error('Staff registration no. already exists')};

        
        // Update staff
        await StaffApplication.findByIdAndUpdate(id, {staff_registration, staff_educational_details, staff_experience_details, staff_document_details}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating staff: ${err}`);
    };
};





// Delete staff application
export const deleteStaffApplication = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting staff
        await StaffApplication.findByIdAndDelete(id);


        // Return
        return 'Staff deleted';

    } catch (err) {
        throw new Error(`Error deleting staff: ${err}`);      
    };
};





// Fetch staff applications names
export const fetchStaffApplicationsNames = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const staff = await StaffApplication.find({session:activeSession?.year_name}, {'staff_registration.first_name':1});


        // Return
        return staff;

    } catch (err:any) {
        throw new Error(`Error fetching staff staff: ${err}`);
    };
};





// Fetch staff applications by all data props
interface fetchStaffApplicationsByAllDataProps{
    first_name:String;
    mobile:String;
    reg_no:String;
};
// Fetch staff applications by all data
export const fetchStaffApplicationsByAllData = async ({first_name, mobile, reg_no}:fetchStaffApplicationsByAllDataProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Regex
        // @ts-ignore
        const firstNameRegex = new RegExp(first_name, 'i');
        // @ts-ignore
        const regNoRegex = new RegExp(reg_no, 'i');


        // Students
        let staffApplications; 


        // Values
        const containsAnyLetters = (str:any) => {
            return /[a-zA-Z]/.test(str);
        }

        if(!containsAnyLetters(mobile) || !containsAnyLetters(reg_no)){

            // Mobile number
            const mobileRes = await StaffApplication.find({'staff_registration.mobile':mobile, session:activeSession?.year_name});


            // All res
            const allRes = mobileRes;
            const uniqueBy = (a:any, key:any) => {
                var seen:any = {};
                return a.filter(function(item:any) {
                    var k = key(item);
                    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                })
            };
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);

            staffApplications = filteredAllRes;

        }else{

            // Name res
            const firstnameRes = await StaffApplication.find({'staff_registration.first_name':{$regex:firstNameRegex}, session:activeSession?.year_name});


            // Registration number res
            const regNoRes = await StaffApplication.find({'staff_registration.reg_no':{$regex:regNoRegex}, session:activeSession?.year_name});


            const allRes = firstnameRes.concat(regNoRes);
            const uniqueBy = (a:any, key:any) => {
                var seen:any = {};
                return a.filter(function(item:any) {
                    var k = key(item);
                    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                })
            };
            const filteredAllRes = uniqueBy(allRes, JSON.stringify);

            staffApplications = filteredAllRes;
        }


        // Return
        return staffApplications;

    } catch (err) {
        throw new Error(`Error searching staff applications: ${err}`);
    };
};





// Fetch staff applications not up for admission
export const fetchStaffApplicationsNotUpForAdmission = async ({joiningDateFrom, joiningDateTo}:any) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Adjust to include the entire day
        const startOfDay = new Date(joiningDateFrom);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(joiningDateTo);
        endOfDay.setHours(23, 59, 59, 999);


        // Fetching
        const staff = await StaffApplication.find({
            session:activeSession?.year_name,
            is_up_for_admission:false,
            'staff_registration.date_of_joining':{
                $gte:startOfDay,
                $lte:endOfDay
            }
        });


        // Return
        return staff;

    } catch (err) {
        throw new Error(`Error searching staff applications: ${err}`);
    };
};





// Apply staff for admission props
interface ApplyStaffForAdmissionProps{
    reg_nos:string[];
};
// Apply staff for admission
export const applyStaffForAdmission = async ({reg_nos}:ApplyStaffForAdmissionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Update staff
        reg_nos.map(async no => {
            const updatedStaff = await StaffApplication.updateMany({'staff_registration.reg_no':no, session:activeSession?.year_name}, {is_up_for_admission:true});
            return updatedStaff;
        });
    

    } catch (err) {
        throw new Error(`Error updating staff: ${err}`);
    };
};





// Fetch staff applications up for admission
export const fetchStaffApplicationsUpForAdmission = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const staff = await StaffApplication.find({session:activeSession?.year_name, is_up_for_admission:true});


        // Return
        return staff;

    } catch (err:any) {
        throw new Error(`Error fetching staff staff: ${err}`);
    };
};