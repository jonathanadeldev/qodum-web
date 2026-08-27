// Import
import mongoose from 'mongoose';





// Student Schema
const StudentSchema = new mongoose.Schema(
    {

        // Session
        session:{type:String, required:true},


        // Student
        student:{
            // 1
            is_up_for_admission:{type:Boolean},
            is_online:{type:Boolean},
            image:{type:String},
            enquiry_no:{type:String},
            reg_no:{type:String, required:true},
            pros_no:{type:String},
            amount:{type:Number},
            date:{type:Date},
            payment_mode:{type:String},
            admission_account:{type:String},
            post_account:{type:String},
            // 2
            class:{type:String},
            board:{type:String},
            stream:{type:String},
            subjects:{type:Array},
            optional_subject:{type:String},
            name:{type:String},
            middle_name:{type:String},
            last_name:{type:String},
            dob:{type:Date},
            place_of_birth:{type:String},
            gender:{type:String},
            contact_person_name:{type:String},
            contact_person_mobile:{type:Number},
            contact_person_email:{type:String},
            secondary_contact_no:{type:Number},
            h_no_and_streets:{type:String},
            email:{type:String},
            city:{type:String},
            mobile:{type:Number},
            state:{type:String},
            pin_code:{type:Number},
            aadhar_card_no:{type:Number},
            religion:{type:String},
            blood_group:{type:String},
            caste:{type:String},
            category:{type:String},
            is_ews:{type:Boolean},
            sibling:{type:Boolean},
            transport:{type:String},
            nationality:{type:String}
        },


        // Parents
        parents:{
            // Father
            father:{
                father_name:{type:String},
                middle_name:{type:String},
                last_name:{type:String},
                profession:{type:String},
                designation:{type:String},
                residence_address:{type:String},
                office_address:{type:String},
                email:{type:String},
                alternate_email:{type:String},
                dob:{type:Date},
                mobile:{type:Number},
                phone:{type:Number},
                company_name:{type:String},
                business_details:{type:String},
                qualification:{type:String},
                service_in:{type:String},
                office_phone:{type:Number},
                office_mobile:{type:Number},
                office_extension:{type:String},
                office_email:{type:String},
                office_website:{type:String},
                annual_income:{type:String},
                parent_status:{type:String}
            },
            // Mother
            mother:{
                mother_name:{type:String},
                middle_name:{type:String},
                last_name:{type:String},
                profession:{type:String},
                designation:{type:String},
                residence_address:{type:String},
                office_address:{type:String},
                email:{type:String},
                alternate_email:{type:String},
                dob:{type:Date},
                mobile:{type:Number},
                phone:{type:Number},
                company_name:{type:String},
                business_details:{type:String},
                qualification:{type:String},
                service_in:{type:String},
                office_phone:{type:Number},
                office_mobile:{type:Number},
                office_extension:{type:String},
                office_email:{type:String},
                office_website:{type:String},
                annual_income:{type:String},
                anniversary_date:{type:Date}
            }
        },


        // Other details
        others:{
            // 1
            student_other_details:{
                medical_history:{type:String},
                descriptions:{type:String},
                allergies:{type:String},
                allergies_causes:{type:String},
                family_doctor_name:{type:String},
                family_doctor_phone:{type:Number},
                family_doctor_address:{type:String},
                distance_from_home:{type:String},
                no_of_living_year:{type:Number},
                only_child:{type:String},
                general_description:{type:String},
            },
            // 2
            student_staff_relation:{
                staff_ward:{type:String},
                staff_name:{type:String}
            },
            // 3
            is_alumni:{
                is_alumni:{type:Boolean},
                academic_session:{type:String},
                class_name:{type:String},
                admission_number:{type:Number},
            },
            // 4
            previous_school_details:{type:Array}
        },


        // Guardian details
        guardian_details:{
            // 1
            guardian_name:{type:String},
            profession:{type:String},
            designation:{type:String},
            company_name:{type:String},
            business_details:{type:String},
            qualification:{type:String},
            // 2
            if_single_parent:{
                student_lives_with:{type:String},
                legal_custody_of_the_child:{type:String},
                correspondence_to:{type:String},
                check_id_applicable:{type:String},
                separation_reason:{type:String}
            }
        },


        // Siblings
        siblings:{type:Array},


        // Paymode details
        paymode_details:{
            cheque_no:{type:String},
            cheque_date:{type:Date},
            cheque_bank:{type:String},
            dd_no:{type:String},
            dd_date:{type:Date},
            dd_bank:{type:String},
            branch_name:{type:String},
            deposit_bank:{type:String},
            neft_name:{type:String}
        }

    },
    {
        timestamps:true
    }
);





// Export
const Student = (mongoose.models.Student || mongoose.model('Student', StudentSchema)) as mongoose.Model<any>;
export default Student;