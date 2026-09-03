'use server';
// Imports
import bcrypt from 'bcryptjs';
import {signToken} from '@/lib/utils';
import {connectToDb} from '@/lib/mongoose';
import User from '@/lib/models/users/manageUsers/User.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create user props
interface CreateUserProps{
    name:String;
    user_name:String;
    password:String;
    is_reset_password:Boolean;
    designation:String;
    email:String;
    employee:String;
    mobile:Number;
    profile_picture:String;
    schools:any;
    is_active:Boolean;
    enable_otp:Boolean;
};
// Create user
export const createUser = async ({name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}:CreateUserProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        // if(!activeSession) return 0;


        // // Checking if the user already exists
        const existingUser = await User.findOne({user_name, session:activeSession?.year_name});
        if(existingUser){
            throw new Error('User already exists');
        };


        // Permissions array
        const permissionsArray = [

            // Admission
            {
                name:'Admission',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Global Masters", sub_menu: "Stationary Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Global Masters", sub_menu: "Define Subject", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Admission", sub_menu: "Enquiry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Admission", sub_menu: "Prospectus Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Admission", sub_menu: "Admission Form Registration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Admission", sub_menu: "Admission", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Admission", sub_menu: "Define Merit Criteria", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Admission", sub_menu: "Merit List Generation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Master Settings", sub_menu: "Prospectus & Registration No Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Master Settings", sub_menu: "Admission Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "Admission Entry", sub_menu: "Admission Fee Collection", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "Global Masters", sub_menu: "Define TC Caste", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "Global Masters", sub_menu: "Define Blood Group", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Global Masters", sub_menu: "Term Master", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Certificate", sub_menu: "Certificates", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Reports", sub_menu: "Student Repeater list", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Global Masters", sub_menu: "Import Student", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Reports", sub_menu: "Merit List Generation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "Reports", sub_menu: "Merit Criteria Print", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Master Settings", sub_menu: "Update Address and Blood", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Master Settings", sub_menu: "Update Student Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Admission", sub_menu: "Create ID Card", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Global Masters", sub_menu: "Define Document Type", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Reports", sub_menu: "Prospectus Charges Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Reports", sub_menu: "Class Wise Admission report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Admission", sub_menu: "Manual List Generation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Master Settings", sub_menu: "Admission Form Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Master Settings", sub_menu: "Student Class Promotion", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Reports", sub_menu: "Merit List Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Master Settings", sub_menu: "Student Image Download", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Admission", sub_menu: "Requests for changes from Parent", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Admission", sub_menu: "Print Student Label", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Reports", sub_menu: "Student HouseWise Strength Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Global Masters", sub_menu: "Define Nationality", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Global Masters", sub_menu: "Define Stream", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "TC", sub_menu: "TC Form Class Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Global Masters", sub_menu: "Possible Siblings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Reports", sub_menu: "Search and import online Registration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Admission", sub_menu: "Slot Creation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Admission", sub_menu: "Slot Wise Point Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Reports", sub_menu: "Slot Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Admission", sub_menu: "Re Slotting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 46, main_menu: "TC", sub_menu: "TC Form", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 47, main_menu: "TC", sub_menu: "Generate TC", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 48, main_menu: "Admission Entry", sub_menu: "Adm Entry AmtStructure", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 49, main_menu: "Global Masters", sub_menu: "Parents Status", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 50, main_menu: "Admission Entry", sub_menu: "Challan Amount", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 51, main_menu: "Reports", sub_menu: "Admission Collection Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 52, main_menu: "Reports", sub_menu: "Admission Withdrawal Register", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 53, main_menu: "Global Masters", sub_menu: "Define Optional Subject", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 54, main_menu: "Reports", sub_menu: "Student Document Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 55, main_menu: "Reports", sub_menu: "Total Collection Report Student Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 56, main_menu: "Reports", sub_menu: "Verification Admission Form", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 57, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 58, main_menu: "Reports", sub_menu: "Sibling Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 59, main_menu: "TC", sub_menu: "Generate TC In Bulk", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 60, main_menu: "Admission", sub_menu: "Upload Student Document", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 61, main_menu: "Global Masters", sub_menu: "Define Parish", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 62, main_menu: "Admission", sub_menu: "Generate Student Info Performa In Bulk", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 63, main_menu: "Master Settings", sub_menu: "Enquiry No Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 64, main_menu: "Reports", sub_menu: "Manual List Generation Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 65, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 66, main_menu: "Global Masters", sub_menu: "Define TC Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 67, main_menu: "Admission", sub_menu: "Admission Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 68, main_menu: "Certificate", sub_menu: "TC", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 69, main_menu: "Global Masters", sub_menu: "Define Cadet Type", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 70, main_menu: "TC", sub_menu: "TC Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 71, main_menu: "Global Masters", sub_menu: "Define House", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 72, main_menu: 'Global Masters', sub_menu: 'Define Category', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 73, main_menu: 'Global Masters', sub_menu: 'Define Club', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 74, main_menu: 'Global Masters', sub_menu: 'Define Religion', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 75, main_menu: 'Global Masters', sub_menu: 'Define Caste', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 76, main_menu: 'Student Health Master', sub_menu: 'Student Health Entry', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 77, main_menu: 'Student Health Master', sub_menu: 'Health Unit Master', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 78, main_menu: 'Student Health Master', sub_menu: 'Health Master', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 79, main_menu: 'Student Health Master', sub_menu: 'Define Term', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 80, main_menu: 'Global Masters', sub_menu: 'Define Remark', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 81, main_menu: 'Master Settings', sub_menu: 'Assign Roll No to Student', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 82, main_menu: 'Master Settings', sub_menu: 'Assign Computer No to Student', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 83, main_menu: 'Admission', sub_menu: 'Enquiry Follow Up', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 84, main_menu: 'Master Settings', sub_menu: 'Admission Open', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 85, main_menu: 'Reports', sub_menu: 'Registration Report', add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 86, main_menu: 'Reports', sub_menu: 'Admission Report', add: false, modify: false, delete: false, print: false, read_only: false },
                ]
            },

        
            // Fees
            {
                name:'Fees',
                permissions:[
                        { sr_no: 1, main_menu: 'Define Session', sub_menu: 'Define Academic Year', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 2, main_menu: 'Define Session', sub_menu: 'Define Financial Year', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 3, main_menu: 'Define School', sub_menu: 'School Global Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 4, main_menu: 'Define Fee Master', sub_menu: 'Define Fee Head', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 5, main_menu: 'Define Fee Master', sub_menu: 'Define Fee Installment', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 6, main_menu: 'Define Fee Master', sub_menu: 'Define Fee Type', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 7, main_menu: 'Define Fee Master', sub_menu: 'Define Fee Group', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 8, main_menu: 'Fee Master', sub_menu: 'Assign Fee Group to Fee Head', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 9, main_menu: 'Define Class Details', sub_menu: 'Define Wing', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 10, main_menu: 'Define Class Details', sub_menu: 'Define Class', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 11, main_menu: 'Define Class Details', sub_menu: 'Relate Class Section', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 12, main_menu: 'Define and Assign Concession', sub_menu: 'Define Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 13, main_menu: 'Define and Assign Concession', sub_menu: 'Define Fee Head Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 14, main_menu: 'Define Class Details', sub_menu: 'Define Section', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 15, main_menu: 'Fee Master', sub_menu: 'Assign Amount Group', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 16, main_menu: 'Master Settings', sub_menu: 'Set Due Limit', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 17, main_menu: 'Master Settings', sub_menu: 'Fee Entry Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 18, main_menu: 'Master Settings', sub_menu: 'Bill Book Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 19, main_menu: 'Master Settings', sub_menu: 'Fee Entry Setting Others', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 20, main_menu: 'Define and Assign Concession', sub_menu: 'Assign Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 21, main_menu: 'Fee Master', sub_menu: 'Student Fee Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 22, main_menu: 'Transport', sub_menu: 'Define Vehicle Type', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 23, main_menu: 'Transport', sub_menu: 'Define Vehicle Route', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 24, main_menu: 'Transport', sub_menu: 'Define Route Stop', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 25, main_menu: 'Transport', sub_menu: 'Define Vehicle Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 26, main_menu: 'Transport', sub_menu: 'Define Vehicle Route Relation', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 27, main_menu: 'Transport', sub_menu: 'Assign Transport To Students', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 28, main_menu: 'Transport', sub_menu: 'Define Transport Fare And Group', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 29, main_menu: 'Fee Master', sub_menu: 'Assign Multiple Group to Student', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 30, main_menu: 'Fee Master', sub_menu: 'Create Students Fees Structure', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 31, main_menu: 'Manage Fee', sub_menu: 'Fee Entry', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 32, main_menu: 'Fee Master', sub_menu: 'Assign Opening Balance', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 33, main_menu: 'Master Settings', sub_menu: 'Fee Opening Balance Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 34, main_menu: 'Define School', sub_menu: 'Define School Board', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 35, main_menu: 'Master Settings', sub_menu: 'Global Search Option Settings', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 36, main_menu: 'Global Masters', sub_menu: 'Define Bank', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 37, main_menu: 'Fee Master', sub_menu: 'Set Student Status', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 38, main_menu: 'Late Fee Settings', sub_menu: 'Late Fee Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 39, main_menu: 'Manage Fee', sub_menu: 'Cancel Fee Receipt', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 40, main_menu: 'Reports', sub_menu: 'Gender/Religion Wise Student Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 41, main_menu: 'Reports', sub_menu: 'Category Wise Student Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 42, main_menu: 'Reports', sub_menu: 'Date Wise Admission Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 43, main_menu: 'Student Strength', sub_menu: 'Class Wise Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 44, main_menu: 'Student Strength', sub_menu: 'Category / Gender Wise Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 45, main_menu: 'Reports', sub_menu: 'Staff Ward List Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 46, main_menu: 'Reports', sub_menu: 'Student House Wise Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 47, main_menu: 'Reports', sub_menu: 'Student Register Date Wise Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 48, main_menu: 'Manage Fee', sub_menu: 'Delete Fee Receipt', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 49, main_menu: 'Transport Report', sub_menu: 'Transport Detail', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 50, main_menu: 'Transport Report', sub_menu: 'Transport Report Class Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 51, main_menu: 'Manage Fee', sub_menu: 'Print Fee Receipt & Certificate', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 52, main_menu: 'Manage Fee', sub_menu: 'Modify Fees Receipt', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 53, main_menu: 'Transport Report', sub_menu: 'Self Transport Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 54, main_menu: 'Manage Fee', sub_menu: 'Manual Fees Modification', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 55, main_menu: 'Fee Master', sub_menu: 'Assign Computer No. To Student', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 56, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 57, main_menu: 'Collection Reports', sub_menu: 'Total Collection Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 58, main_menu: 'Collection Reports', sub_menu: 'Month Wise Collection Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 59, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection Date/Fee Group Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 60, main_menu: 'Collection Reports', sub_menu: 'Estimated Collection Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 61, main_menu: 'Collection Reports', sub_menu: 'Fee Collection With Entry Time Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 62, main_menu: 'Collection Reports', sub_menu: 'Monthly Consolidated Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 63, main_menu: 'Collection Reports', sub_menu: 'Day Wise Total Collection', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 64, main_menu: 'Ledger Reports', sub_menu: 'Student Ledger Class Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 65, main_menu: 'Concession Reports', sub_menu: 'Fees Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 66, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter List', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 67, main_menu: 'Transaction Report', sub_menu: 'Advance Payment Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 68, main_menu: 'Ledger Reports', sub_menu: 'Annual Student Ledger 3', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 69, main_menu: 'Ledger Reports', sub_menu: 'Fees Student Ledger', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 70, main_menu: 'Master Settings', sub_menu: 'Report Layout Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 71, main_menu: 'Master Settings', sub_menu: 'Change Academic', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 72, main_menu: 'Cancelled Receipt Reports', sub_menu: 'Cancelled Fees Receipt Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 73, main_menu: 'Fee Master', sub_menu: 'Assign Roll No. To Student', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 74, main_menu: 'Student Strength', sub_menu: 'Religion / Gender Wise Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 75, main_menu: 'Student Strength', sub_menu: 'Student Strength Ratio Wise Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 76, main_menu: 'Define and Assign Concession', sub_menu: 'Assign concession to single student', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 77, main_menu: 'Reports', sub_menu: 'Active/Inactive Students Detail Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 78, main_menu: 'Collection Reports', sub_menu: 'Fee Collection Student and Class Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 79, main_menu: 'Master Settings', sub_menu: 'Receipt Certificate Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 80, main_menu: 'Manage Fee', sub_menu: 'Fees Upload', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 81, main_menu: 'Master Settings', sub_menu: 'Online Payment Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 82, main_menu: 'Collection Reports', sub_menu: 'Receipt wise Daily Collection', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 83, main_menu: 'Transport Report', sub_menu: 'Assigned Transport Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 84, main_menu: 'Transport Report', sub_menu: 'Print TransportId Card', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 85, main_menu: 'Cancelled Receipt Reports', sub_menu: 'Fees Cheque Bounce Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 86, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter Report Consolidated', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 87, main_menu: 'Transport', sub_menu: 'Travel Agency Master', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 88, main_menu: 'Reconcile Reports', sub_menu: 'Reconcile Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 89, main_menu: 'Transaction Report', sub_menu: 'Uploaded Excel Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 90, main_menu: 'Global Masters', sub_menu: 'Define SMS Template', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 91, main_menu: 'Reports', sub_menu: 'Student Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 92, main_menu: 'Reports', sub_menu: 'Class Section Transfer Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 93, main_menu: 'Master Settings', sub_menu: 'Bus ID Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 94, main_menu: 'Reports', sub_menu: 'Class Wise Student Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 95, main_menu: 'Student Strength', sub_menu: 'Ews ClassWise Strength Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 96, main_menu: 'Student Strength', sub_menu: 'Transport Student Strength Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 97, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection Receipt Range', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 98, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter Report With Receiving', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 99, main_menu: 'Transaction Report', sub_menu: 'Student Amount Fee Type Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 100, main_menu: 'Transport Report', sub_menu: 'Paid Transport', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 101, main_menu: 'Master Settings', sub_menu: 'Update Online Data', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 102, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection Account Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 103, main_menu: 'Concession Reports', sub_menu: 'Fees Concession Install/Head Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 104, main_menu: 'Manage Fee', sub_menu: 'Refund Head Amount', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 105, main_menu: 'Define and Assign Concession', sub_menu: 'Define Concession Type', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 106, main_menu: 'Define and Assign Concession', sub_menu: 'Assign Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 107, main_menu: 'Collection Reports', sub_menu: 'Fee Head Wise Collection Class Range', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 108, main_menu: 'Reports', sub_menu: 'Opening Dues Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 109, main_menu: 'Amount Without Structure', sub_menu: 'Pay Amount Without Structure', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 110, main_menu: 'Transaction Report', sub_menu: 'Student Wise Receipt Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 111, main_menu: 'Collection Reports', sub_menu: 'Student Wise Collection Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 112, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter Installment Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 113, main_menu: 'Manage Fee', sub_menu: 'Fee Cheque Clearing', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 114, main_menu: 'Reports', sub_menu: 'Sms Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 115, main_menu: 'Reports', sub_menu: 'Refund Amount', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 116, main_menu: 'Amount Without Structure Reports', sub_menu: 'Amount without Structure report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 117, main_menu: 'Transport Report', sub_menu: 'Estimated Transport Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 118, main_menu: 'Reports', sub_menu: 'Class Wise Sibling', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 119, main_menu: 'Cheque Reports', sub_menu: 'Cheque Clearing Status Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 120, main_menu: 'Collection Reports', sub_menu: 'Receipt wise Fee Type Collection', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 121, main_menu: 'Ledger Reports', sub_menu: 'Annual Student Ledger 1', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 122, main_menu: 'Transaction Report', sub_menu: 'Defaulter Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 123, main_menu: 'Transaction Report', sub_menu: 'Collection Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 124, main_menu: 'Reports', sub_menu: 'Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 125, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection Date Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 126, main_menu: 'Reconcile Reports', sub_menu: 'Reconcile Installment Class Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 127, main_menu: 'Reports', sub_menu: 'Transport Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 128, main_menu: 'Global Masters', sub_menu: 'Define School', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 129, main_menu: 'Reports', sub_menu: 'Student Health Entry Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 130, main_menu: 'Transaction Report', sub_menu: 'Ledger Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 131, main_menu: 'Ledger Reports', sub_menu: 'Annual Student Ledger 2', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 132, main_menu: 'Student Strength', sub_menu: 'Route Wise Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 133, main_menu: 'Collection Reports', sub_menu: 'Yearly Collection Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 134, main_menu: 'Transaction Report', sub_menu: 'Bad Debts Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 135, main_menu: 'Late Fee Settings', sub_menu: 'Late Fee Setting Head Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 136, main_menu: 'Master Settings', sub_menu: 'Generate Bill Book Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 137, main_menu: 'Reports', sub_menu: 'Surname Wise Student Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 138, main_menu: 'Reports', sub_menu: 'Group Wise Student Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 139, main_menu: 'Transport', sub_menu: 'Define Transport Medium', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 140, main_menu: 'Transport', sub_menu: 'Assign Self Transport To Student', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 141, main_menu: 'Master Settings', sub_menu: 'Session Transfer', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 142, main_menu: 'Reports', sub_menu: 'Class Wise Mark List', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 143, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter Slip', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 144, main_menu: 'Manage Fee', sub_menu: 'Multiple Remarks', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 145, main_menu: 'Manage Fee', sub_menu: 'Reconciliation Fee Receipt', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 146, main_menu: 'Cheque Reports', sub_menu: 'Cheque Report Date Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 147, main_menu: 'Fee Master', sub_menu: 'Verify Structure', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 148, main_menu: 'Manage Fee', sub_menu: 'Transfer Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 149, main_menu: 'Concession Reports', sub_menu: 'Fees Concession And Dues', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 150, main_menu: 'Student Strength', sub_menu: 'Student Strength Consolidated', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 151, main_menu: 'Manage Fee', sub_menu: 'Modify Receipt Date & Bank', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 152, main_menu: 'Defaulter Reports', sub_menu: 'Unpaid Student Report', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 153, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection Date Wise With Remark', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 154, main_menu: 'Manage Fee', sub_menu: 'Fees Upload With Deposit Bank', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 155, main_menu: 'Reports', sub_menu: 'Mid Year Student Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 156, main_menu: 'Transaction Report', sub_menu: 'Get Difference from Bank Amount', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 157, main_menu: 'Student Strength', sub_menu: 'Category / Gender / Relegion Wise Student Strength', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 158, main_menu: 'Collection Reports', sub_menu: 'PTA Daily Fee Collection Date/Fee Group Wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 159, main_menu: 'Ledger Reports', sub_menu: 'Student Ledger Class Wise With Rec. Date', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 160, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter List With Head Fine Filter', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 161, main_menu: 'Defaulter Reports', sub_menu: 'Defaulter List Install/Head wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 162, main_menu: 'Collection Reports', sub_menu: 'Daily Fee Collection List With Head Fine Filter', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 163, main_menu: 'Amount Without Structure', sub_menu: 'Pay amount without structure for Staff', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 164, main_menu: 'Amount Without Structure Reports', sub_menu: 'Amount Without Structure for Staff', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 165, main_menu: 'Defaulter Reports', sub_menu: 'Fee Defaulter List Boarding wise', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 166, main_menu: 'Global Masters', sub_menu: 'Define Session', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 167, main_menu: 'Global Masters', sub_menu: 'Define Class Details', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 168, main_menu: 'Global Masters', sub_menu: 'Student Health Master', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 169, main_menu: 'Fee Master', sub_menu: 'Define Fee Master', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 170, main_menu: 'Fee Master', sub_menu: 'Define and Assign Concession', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 171, main_menu: 'Fee Master', sub_menu: 'Late Fee Settings', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 172, main_menu: 'Manage Fee', sub_menu: 'Amount Without Structure', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 173, main_menu: 'Transaction Report', sub_menu: 'Reconcile Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 174, main_menu: 'Transaction Report', sub_menu: 'Concession Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 175, main_menu: 'Transaction Report', sub_menu: 'Cancelled Receipt Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 176, main_menu: 'Transaction Report', sub_menu: 'Amount Without Structure Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 177, main_menu: 'Transaction Report', sub_menu: 'Cheque Reports', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 178, main_menu: 'Master Setting', sub_menu: 'Fee Certificate Setting', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 179, main_menu: 'Fee Master', sub_menu: 'Refund Fee', add: false, modify: false, delete: false, print: false, read_only: false },
                        { sr_no: 180, main_menu: 'Transport', sub_menu: 'Vehicle Alerts', add: false, modify: false, delete: false, print: false, read_only: false },
                ]
            },


            // Attendance
            {
                name:'Attendance',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Global Masters", sub_menu: "Define Leave", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Other Reports", sub_menu: "LWP Year Wise Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Global Masters", sub_menu: "Define Shift Master", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Attendance", sub_menu: "Upload Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Attendance", sub_menu: "Staff Shift Relation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Attendance", sub_menu: "Process Leave", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Global Masters", sub_menu: "Define Holiday", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "Attendance", sub_menu: "Assign Leave To Staff", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "Attendance", sub_menu: "Mark Manual Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "Daily Reports", sub_menu: "Late In Early Out Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Attendance", sub_menu: "Auto Process Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Daily Reports", sub_menu: "Attendance Consolidated Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Attendance", sub_menu: "Process Leave Application", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Daily Reports", sub_menu: "Staff Wise Daily Attendance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Daily Reports", sub_menu: "Absent / Missing Attendance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Daily Reports", sub_menu: "Biometrics Attendance Detail Department Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Attendance", sub_menu: "Modify Staff in Bulk", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "Other Reports", sub_menu: "Staff Shift Relation Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Monthly Reports", sub_menu: "Monthly Attendance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Daily Reports", sub_menu: "Weekly Attendance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Daily Reports", sub_menu: "Daily Performance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Attendance", sub_menu: "Reprocess Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Daily Reports", sub_menu: "Attendance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Monthly Reports", sub_menu: "Attendance Report Monthly Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Leave Reports", sub_menu: "Leave Balance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Other Reports", sub_menu: "Attendance Analysis Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Leave Reports", sub_menu: "Sanctioned Leave Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Leave Reports", sub_menu: "Leave Card Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Leave Reports", sub_menu: "Leave Ledger Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Leave Reports", sub_menu: "Leave Register Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Leave Reports", sub_menu: "Leave Bucket Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Monthly Reports", sub_menu: "Monthly Performance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Attendance", sub_menu: "Leave Acceptance Employee Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Monthly Reports", sub_menu: "Monthly Consolidated Biometric Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "Attendance", sub_menu: "Mark Leave Staff Type Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Monthly Reports", sub_menu: "School Staff Attendance Register", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Monthly Reports", sub_menu: "Monthly Late In Count Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Attendance", sub_menu: "Leave Marking", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Leave Reports", sub_menu: "Leave Format Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Global Masters", sub_menu: "Report Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 46, main_menu: "Reports", sub_menu: "Daily Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 47, main_menu: "Reports", sub_menu: "Monthly Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 48, main_menu: "Reports", sub_menu: "Leave Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 49, main_menu: "Reports", sub_menu: "Other Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 50, main_menu: "Global Masters", sub_menu: "Attendance Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 51, main_menu: "Global Masters", sub_menu: "Employee Enrollment", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 52, main_menu: "Global Masters", sub_menu: "Mark Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 53, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Payroll
            {
                name:'Payroll',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Global Masters", sub_menu: "Define Profession", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Global Masters", sub_menu: "Define Staff Type", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Global Masters", sub_menu: "Define Designation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Global Masters", sub_menu: "Employee Registration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Create Salary Structure", sub_menu: "Define Salary Group", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Create Salary Structure", sub_menu: "Define Salary Head", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Create Salary Structure", sub_menu: "Assign Salary Head to Group", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Create Salary Structure", sub_menu: "Assign Salary Group to Staff", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Global Masters", sub_menu: "Define Department", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "TDS Configuration", sub_menu: "Define IT Head Groups", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "TDS Configuration", sub_menu: "Define IT Head", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "TDS Configuration", sub_menu: "Define TDS Deductee", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Master Settings", sub_menu: "Define Global Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Advance", sub_menu: "Fix Advance A/c", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Advance", sub_menu: "Advance entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Advance", sub_menu: "Advance Repayment", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Salary Structure", sub_menu: "Leave LWP Manual", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Create Salary Structure", sub_menu: "Relate Static Dynamic Heads", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Advance Report", sub_menu: "Advance Ledger Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "TDS Configuration", sub_menu: "Define Income Tax Slab", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Salary Structure", sub_menu: "Staff Salary Structure", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Increment", sub_menu: "Auto Increment", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Salary Structure", sub_menu: "Occasional Allowance/Deduction", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Salary Structure", sub_menu: "IT Head Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Payroll Master", sub_menu: "Define Salary Account", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Increment", sub_menu: "Increment Rollback", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Salary Structure", sub_menu: "Bonus Calculations", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Reports", sub_menu: "Increment Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Payroll Master", sub_menu: "Assign Info Bulk", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Reports", sub_menu: "Retirement Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Reports", sub_menu: "Employee Statistics", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Monthly Reports", sub_menu: "Staff Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Salary Structure", sub_menu: "Salary Generation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Payroll Master", sub_menu: "Define Salary Month", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Monthly Reports", sub_menu: "Gross Salary Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Salary Reports", sub_menu: "Estimated Salary Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "Salary Structure", sub_menu: "Bank Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Salary Reports", sub_menu: "Salary Slip", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Reports", sub_menu: "PF Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Reports", sub_menu: "ESI Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Salary Structure", sub_menu: "TDS Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Advance Report", sub_menu: "Advance Entry Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 46, main_menu: "Advance Report", sub_menu: "Advance Repayment Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 47, main_menu: "Monthly Reports", sub_menu: "Department wise Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 48, main_menu: "Salary Reports", sub_menu: "Employee Type wise Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 49, main_menu: "Income Tax", sub_menu: "TDS Entry Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 50, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 51, main_menu: "Income Tax", sub_menu: "Form 16", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 52, main_menu: "Salary Reports", sub_menu: "Salary Sheet", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 53, main_menu: "Salary Reports", sub_menu: "Bank Statement Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 54, main_menu: "Reports", sub_menu: "Date Range Retirement Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 55, main_menu: "Monthly Reports", sub_menu: "Month Wise Salary Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 56, main_menu: "Reports", sub_menu: "PF Challan Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 57, main_menu: "Monthly Reports", sub_menu: "Consolidated Salary Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 58, main_menu: "Create Salary Structure", sub_menu: "Bulk Salary Head Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 59, main_menu: "Salary Structure", sub_menu: "Generate Salary Status", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 60, main_menu: "Yearly Reports", sub_menu: "Salary Certificate Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 61, main_menu: "Reports", sub_menu: "Professional Tax", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 62, main_menu: "Pay Scale Configuration", sub_menu: "Assign Pay Scale to Staff", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 63, main_menu: "Reports", sub_menu: "Super Annunciation Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 64, main_menu: "Reports", sub_menu: "Pension List", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 65, main_menu: "Reports", sub_menu: "MACP List", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 66, main_menu: "Pay Scale Configuration", sub_menu: "Define Pay Scale", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 67, main_menu: "Pay Scale Configuration", sub_menu: "Define Pay Scale Amount", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 68, main_menu: "Pay Scale Configuration", sub_menu: "Define Grade Pay", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 69, main_menu: "Pay Scale Configuration", sub_menu: "Define Fixation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 70, main_menu: "Reports", sub_menu: "Fixation Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 71, main_menu: "Reports", sub_menu: "Salary compare", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 72, main_menu: "Reports", sub_menu: "GSLI Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 73, main_menu: "Reports", sub_menu: "Experience Certificate Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 74, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 75, main_menu: "Payroll Master", sub_menu: "Generate Barcode", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 76, main_menu: "Income Tax", sub_menu: "Gross Form 16", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 77, main_menu: "Global Masters", sub_menu: "Update Staff Profile", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 78, main_menu: "Yearly Reports", sub_menu: "Salary Statement Employee Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 79, main_menu: "Global Masters", sub_menu: "Define Reminder", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 80, main_menu: "Global Masters", sub_menu: "Rejoin Staff", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 81, main_menu: "Reports", sub_menu: "Comparison Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 82, main_menu: "Create Salary Structure", sub_menu: "Bulk Salary Head Assign", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 83, main_menu: "Income Tax", sub_menu: "TDS 24Q", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 84, main_menu: "Create Salary Structure", sub_menu: "Bulk Head Remark Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 85, main_menu: "Yearly Reports", sub_menu: "Reconciliation Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 86, main_menu: "Monthly Reports", sub_menu: "Monthly Summary Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 87, main_menu: "Salary Structure", sub_menu: "Daily Wages Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 88, main_menu: "Salary Structure", sub_menu: "Gratuity Calculations", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 89, main_menu: "Global Masters", sub_menu: "Assign Transport To Staff", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 90, main_menu: "Reports", sub_menu: "Gratuity Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 91, main_menu: "Income Tax", sub_menu: "Quarterly Form 24Q", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 92, main_menu: "Monthly Reports", sub_menu: "Head Wise Gross Salary Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 93, main_menu: "Yearly Reports", sub_menu: "Annual Salary Paid Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 94, main_menu: "Global Masters", sub_menu: "Report Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 95, main_menu: "Payroll Master", sub_menu: "Insurance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 96, main_menu: "Salary Structure", sub_menu: "Insurance Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 97, main_menu: "Salary Reports", sub_menu: "Insurance Statement Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 98, main_menu: "Salary Structure", sub_menu: "Due Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 99, main_menu: "Reports", sub_menu: "Employee Bio Data", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 100, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 101, main_menu: "Payroll Master", sub_menu: "Create Salary Structure", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 102, main_menu: "Payroll Master", sub_menu: "TDS Configuration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 103, main_menu: "Payroll Master", sub_menu: "Pay Scale Configuration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 104, main_menu: "Advance", sub_menu: "Advance Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 105, main_menu: "Salary Structure", sub_menu: "Increment", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 106, main_menu: "Salary Reports", sub_menu: "Income Tax", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 107, main_menu: "Salary Reports", sub_menu: "Monthly Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 108, main_menu: "Salary Reports", sub_menu: "Yearly Reports", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 109, main_menu: "Global Masters", sub_menu: "Define Document Type", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 110, main_menu: "Global Masters", sub_menu: "Candidate Registration", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 111, main_menu: "Global Masters", sub_menu: "Shortlisted Candidate", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 112, main_menu: "Global Masters", sub_menu: "Current Job Opening", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 113, main_menu: "Global Masters", sub_menu: "Admission Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                ]
            },


            // Marks Entry
            {
                name:'Marks Entry',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Examinations
            {
                name:'Examinations',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Time Table
            {
                name:'Time Table',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Relation Master", sub_menu: "Define Class Teacher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Relation Master", sub_menu: "Assign Subject To Class", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Relation Master", sub_menu: "Relate Resource to Subject", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Relation Master", sub_menu: "Period Allotment", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Constraints Master", sub_menu: "Fixed Allocation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Constraints Master", sub_menu: "Parallel Allocation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "Constraints Master", sub_menu: "Consecutive Allocation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "Constraints Master", sub_menu: "Preference Allocation", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "Create Timetable", sub_menu: "View and Modify Timetable", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Create Timetable", sub_menu: "Auto Generate Timetable", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Create Timetable", sub_menu: "Replace Teacher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Create Timetable", sub_menu: "Assign one Teacher Timetable To Another", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Relation Master", sub_menu: "Define Resource", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Relation Master", sub_menu: "Class Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Relation Master", sub_menu: "Timetable Global Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Relation Master", sub_menu: "Teacher Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "Relation Master", sub_menu: "Class Teacher Subject", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Substitution Master", sub_menu: "Mark Attendance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Substitution Master", sub_menu: "Substitution", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Reports", sub_menu: "Subject Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Reports", sub_menu: "Master Requirement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Reports", sub_menu: "Class Teacher Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Reports", sub_menu: "Parallel Allocation Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Reports", sub_menu: "Subject Wise Teacher Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Reports", sub_menu: "Wing Wise Teacher Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Reports", sub_menu: "Class Timetable Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Reports", sub_menu: "Teacher Timetable Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Reports", sub_menu: "Consecutive Allocation Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Reports", sub_menu: "Class and Resource Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Reports", sub_menu: "Week wise free Teacher Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Reports", sub_menu: "Unallocated Period Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Reports", sub_menu: "Day wise free Teacher Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Reports", sub_menu: "Class and Subject Taught", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "Reports", sub_menu: "Teachers Work Load Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Reports", sub_menu: "Resource Timetable Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Reports", sub_menu: "Particular Class Timetable Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Reports", sub_menu: "Class Wise Teacher Allocation Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Reports", sub_menu: "Date Wise Substitution Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Reports", sub_menu: "Assignment Status", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Reports", sub_menu: "Subject Summary", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 46, main_menu: "Create Timetable", sub_menu: "Modify Timetable", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 47, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 48, main_menu: "Relation Master", sub_menu: "Period Time Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 49, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 50, main_menu: "Reports", sub_menu: "Subject Wise Teacher Allocation Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 51, main_menu: "Reports", sub_menu: "Show Timetable At Glance", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Accounts
            {
                name:'Accounts',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Accounts", sub_menu: "Define Account Group", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Accounts", sub_menu: "Define Bank Ledger", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Accounts", sub_menu: "Define Party Ledger", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Accounts", sub_menu: "Define General Ledger", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Accounts", sub_menu: "Bank Payment Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Accounts", sub_menu: "Cash Payment Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Accounts", sub_menu: "Bank Receipt Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Accounts", sub_menu: "Cash Receipt Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Accounts", sub_menu: "Contra Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "Accounts", sub_menu: "Journal Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "Reports", sub_menu: "Daily Cash Status", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "Reports", sub_menu: "Bank Ledger", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Ledger Report", sub_menu: "Ledger Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Reports", sub_menu: "Trial Balance", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Accounts", sub_menu: "Cheque Clearing", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Reports", sub_menu: "Depreciation Chart", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Reports", sub_menu: "Day Book", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Reports", sub_menu: "Depreciation Detail Item Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Reports", sub_menu: "Balance Sheet", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "Reports", sub_menu: "Profit & Loss", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Reports", sub_menu: "Income & Expenditure", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Accounts", sub_menu: "Salary Payment Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Accounts", sub_menu: "Define Group Nature", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Reports", sub_menu: "Cash/Bank Book", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Master Settings", sub_menu: "Voucher Print Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Master Settings", sub_menu: "Voucher Code Settings", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Reports", sub_menu: "Journal Ledger/Book", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Ledger Report", sub_menu: "Ledger Report Detail", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Accounts", sub_menu: "Voucher Image Upload", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Reports", sub_menu: "Trial Balance New", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Global Masters", sub_menu: "Define Narration Master", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Reports", sub_menu: "Reconciliation Statement", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Accounts", sub_menu: "Cheque Printing", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Reports", sub_menu: "Entry Type Wise Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "Master Settings", sub_menu: "Account Master Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Reports", sub_menu: "Group Wise Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Reports", sub_menu: "Fee Outstanding Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Master Settings", sub_menu: "Account Petty Cash Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Accounts", sub_menu: "Payment Voucher", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Reports", sub_menu: "Serialize Voucher Code", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 46, main_menu: "Ledger Report", sub_menu: "Ledger Report Detail New", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 47, main_menu: "Master Settings", sub_menu: "Cheque Print Format Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 48, main_menu: "Reports", sub_menu: "Fee Account Mismatch", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 49, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 50, main_menu: "Ledger Report", sub_menu: "Ledger Report With Filter", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 51, main_menu: "Reports", sub_menu: "Ledger Report", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Stocks
            {
                name:'Stocks',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Global Masters", sub_menu: "Define Item Category", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Global Masters", sub_menu: "Define Unit", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Global Masters", sub_menu: "Define Item", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Global Masters", sub_menu: "Define Items Sub Category", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Stock", sub_menu: "Purchase Order", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Stock", sub_menu: "Stock In Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Stock", sub_menu: "Stock Bill Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Global Masters", sub_menu: "Define Brand Name", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Stock", sub_menu: "Purchase Return Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 12, main_menu: "Stock", sub_menu: "Stock Issue", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 13, main_menu: "Stock", sub_menu: "Stock Return", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 14, main_menu: "Reports", sub_menu: "Purchase Order Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 15, main_menu: "Reports", sub_menu: "Challan Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 16, main_menu: "Reports", sub_menu: "Bill Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 17, main_menu: "Reports", sub_menu: "Stock Opening Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 18, main_menu: "Reports", sub_menu: "Cumulative Stock Statement Value Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 19, main_menu: "Reports", sub_menu: "Purchase Return Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 20, main_menu: "Reports", sub_menu: "Employee Issue Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 21, main_menu: "Reports", sub_menu: "Stock Issue Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 22, main_menu: "Reports", sub_menu: "Other Return Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 23, main_menu: "Reports", sub_menu: "Employee Return Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 24, main_menu: "Reports", sub_menu: "Active Stock", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 25, main_menu: "Reports", sub_menu: "Stock In Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 26, main_menu: "Reports", sub_menu: "Max Stock Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 27, main_menu: "Reports", sub_menu: "Min Stock Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 28, main_menu: "Stock", sub_menu: "Asset Opening Entry", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 29, main_menu: "Stock", sub_menu: "Opening Qty", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 30, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 31, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 32, main_menu: "Reports", sub_menu: "Stock Ledger", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 33, main_menu: "Reports", sub_menu: "Item Master Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 34, main_menu: "Master Settings", sub_menu: "Stock Master Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 35, main_menu: "Stock", sub_menu: "Stock Return Item Wise", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 36, main_menu: "Master Settings", sub_menu: "Notification Scheduler", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 37, main_menu: "Master Settings", sub_menu: "Set Stock Reminder Details", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 38, main_menu: "Stock", sub_menu: "Multiple Stock Issue", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 39, main_menu: "Stock", sub_menu: "Requisition Order", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 40, main_menu: "Stock", sub_menu: "Stock Destroy", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 41, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 42, main_menu: "Reports", sub_menu: "Stock Destroy Report", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 43, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 44, main_menu: "Global Masters", sub_menu: "Define GST Slab", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 45, main_menu: "Global Masters", sub_menu: "Relate Item With GST Slab", add: false, modify: false, delete: false, print: false, read_only: false }                   
                ]
            },


            // Library
            {
                name:'Library',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false }                
                ]
            },


            // Users
            {
                name:'Users',
                permissions:[
                    { sr_no: 1, main_menu: "Manage Users", sub_menu: "Create User", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Manage Users", sub_menu: "User Permission", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 3, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 4, main_menu: "Define Session", sub_menu: "Define Financial Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 5, main_menu: "Manage Users", sub_menu: "Fee Type Assign To User", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 6, main_menu: "Master Settings", sub_menu: "Report Layout Setting", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 7, main_menu: "Master Settings", sub_menu: "Change Academic", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 8, main_menu: "Master Settings", sub_menu: "Session Transfer", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 9, main_menu: "Global Masters", sub_menu: "Define Session", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 10, main_menu: "Manage Users", sub_menu: "Create Role", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 11, main_menu: "Manage Users", sub_menu: "User Role", add: false, modify: false, delete: false, print: false, read_only: false }
                ]
            },


            // Qodum Care
            {
                name:'Qodum Care',
                permissions:[
                    { sr_no: 1, main_menu: "Define Session", sub_menu: "Define Academic Year", add: false, modify: false, delete: false, print: false, read_only: false },
                    { sr_no: 2, main_menu: "Global Masters", sub_menu: "App Control", add: false, modify: false, delete: false, print: false, read_only: false }     
                ]
            }

        ];


        // Creating new user
        const newUser = await User.create({session:activeSession?.year_name || '', name, user_name, password:bcrypt.hashSync(password), is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp, permissions:permissionsArray, is_admin:false, fee_types:[]});
        // const newUser = await User.create({session:'2019', name, user_name, password:bcrypt.hashSync(password), is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp, permissions:permissionsArray, is_admin:false, fee_types:[]});
        newUser.save();


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating user: ${err.message}`);
    };
};





// Fetch users
export const fetchUsers = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        // const users = await User.find({});
        const users = await User
            .find({session:activeSession?.year_name})
            .select('-password')
            .lean();

        const serializableUsers = JSON.parse(JSON.stringify(users));


        // Return
        return serializableUsers;

    } catch (err:any) {
        throw new Error(`Error fetching users: ${err}`);
    };
};





// Fetch user by id
// export const fetchUserById = async ({id}:{id:string}) => {
//     try {

//         // Db connection
//         connectToDb('accounts');


//         // Acive session
//         const activeSession = await AcademicYear.findOne({is_active:true});


//         // Fetching
//         const user = await User.findById(id);


//         // Return
//         return JSON.parse(JSON.stringify(user));

//     } catch (err:any) {
//         throw new Error(`Error fetching user: ${err}`);
//     };
// };





// Modify user props
interface ModifyUserProps{
    id:String;
    name:String;
    user_name:String;
    password:String;
    is_reset_password:Boolean;
    designation:String;
    email:String;
    employee:String;
    mobile:Number;
    profile_picture:String;
    schools:any;
    is_active:Boolean;
    enable_otp:Boolean;
}
// Modify user
export const modifyUser = async ({id, name, user_name, password, is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}:ModifyUserProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the user already exists
        const user = await User.find({session:activeSession?.year_name});
        const existingUser = await User.findById(id);
        if(existingUser.user_name !== user_name && user.map(s => s.user_name).includes(user_name)){throw new Error('User already exists')};

        
        // Update user
        await User.findByIdAndUpdate(id, {name, user_name, password:bcrypt.hashSync(password), is_reset_password, designation, email, employee, mobile, profile_picture, schools, is_active, enable_otp}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating user: ${err}`);
    };
};





// Delete user
export const deleteUser = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting user
        await User.findByIdAndDelete(id);


        // Return
        return 'User deleted';

    } catch (err) {
        throw new Error(`Error deleting user: ${err}`);      
    };
};





// Modify user's permissions props
interface ModifyUserPermissionsProps{
    id:String;
    permissions:any;
}
// Modify user permission
export const modifyUserPermissions = async ({id, permissions}:ModifyUserPermissionsProps) => {
    try {

        // Db connection
        connectToDb('accounts');

        
        // Update user
        await User.findByIdAndUpdate(id, {permissions}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating user: ${err}`);
    };
};





// Modify user's fee types props
interface ModifyUserFeeTypesProps{
    id:String;
    fee_types:any;
}
// Modify user fee types
export const modifyUserFeeTypes = async ({id, fee_types}:ModifyUserFeeTypesProps) => {
    try {

        // Db connection
        connectToDb('accounts');

        
        // Update user
        await User.findByIdAndUpdate(id, {fee_types}, {new:true});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating user: ${err}`);
    };
};





// Login user
export const loginUser = async ({user_name, password}:any) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Validations
        const user = await User.findOne({user_name});
        if(!user){
            return {success:false, message:'User not found'};
        };
        const match = bcrypt.compareSync(password, user.password);
        if(!match){
            return {success:false, message:'Wrong password'};
        };


        // loging user
        const token = signToken(JSON.parse(JSON.stringify(user)));
        return({
            success:true,
            user:JSON.parse(JSON.stringify({
                ...user._doc,
                token
            }))
        });

    }catch(err){
        throw new Error(`Error with user login: ${err}`);  
    };
};





// Update user permissions
export const updateUserPermissions = async ({user_name}:any) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Validations
        const user = await User.findOne({user_name});
        if(!user){
            return {success:false, message:'User not found'};
        };
        // const match = bcrypt.compareSync(password, user.password);
        // if(!match){
        //     return {success:false, message:'Wrong password'};
        // };


        // loging user
        const token = signToken(JSON.parse(JSON.stringify(user)));
        return({
            success:true,
            user:JSON.parse(JSON.stringify({
                ...user._doc,
                token
            }))
        });

    }catch(err){
        throw new Error(`Error updating user permissions: ${err}`);  
    };
};





// Fetch admin
export const fetchAdmin = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const user = await User.findOne({session:activeSession?.year_name, is_admin:true});


        // Validations
        if(!user){
            return {success:false, message:'User not found'};
        };


        // loging user
        const token = signToken(JSON.parse(JSON.stringify(user)));
        return({
            success:true,
            user:JSON.parse(JSON.stringify({
                ...user._doc,
                token
            }))
        });

    } catch (err:any) {
        throw new Error(`Error fetching users: ${err}`);
    };
};