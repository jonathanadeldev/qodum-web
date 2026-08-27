// Import
import mongoose from 'mongoose';





// Admitted Student Schema
const AdmittedStudentSchema = new mongoose.Schema(
    {

        // Session
        session:{type:String, required:true},


        // Student
        student:{
            // Admission data
            section:{type:String},
            adm_no:{type:String},
            pen_no:{type:String},
            par_id:{type:String},
            roll_no:{type:String},
            bill_no:{type:String},
            is_university:{type:Boolean},
            re_adm_no:{type:String},
            is_minority:{type:Boolean},
            is_disability:{type:Boolean},
            dis_disc:{type:String},
            is_new:{type:Boolean},
            is_active:{type:Boolean},
            reason:{type:String},
            is_only_child:{type:Boolean},
            student_status:{type:String},
            house:{type:String},
            doa:{type:Date},
            doj:{type:Date},
            admitted_class:{type:String},

            //1
            image:{type:String},
            // 2
            stream:{type:String},
            subjects:{type:Array},
            optional_subject:{type:String},
            class:{type:String},
            board:{type:String},
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
            locality:{type:String},
            email:{type:String},
            city:{type:String},
            mobile:{type:Number},
            state:{type:String},
            pin_code:{type:Number},
            aadhar_card_no:{type:Number},
            whats_app_no:{type:Number},
            religion:{type:String},
            parish:{type:String},
            caste:{type:String},
            category:{type:String},
            blood_group:{type:String},
            cadet_type:{type:String},
            club:{type:String},
            is_ews:{type:Boolean},
            is_rte:{type:Boolean},
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


        // Health details
        health_details:{
            height:{type:Number},
            weight:{type:Number}
        },


        // Documents
        documents:{type:Array},


        // Affiliated heads
        affiliated_heads:{
            group_name:{type:String},
            heads:{type:Array}
        },


        // Transport details
        transport_details:{
            route:{type:String},
            stop:{type:String},
            vehicle:{type:String},
            seat_no:{type:Number},
            months:{type:Array}
        }

    },
    {
        timestamps:true
    }
);





// Export
const AdmittedStudent = (mongoose.models.AdmittedStudent || mongoose.model('AdmittedStudent', AdmittedStudentSchema)) as mongoose.Model<any>;
export default AdmittedStudent;