'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Student from '@/lib/models/admission/admission/Student.model';
import Subject from '@/lib/models/admission/globalMasters/Subject.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';





// Create student props
interface CreateStudentProps{
    // Student
    student:{
        // 1
        is_online:Boolean;
        image:String;
        enquiry_no:String;
        reg_no:String;
        pros_no:String;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        // 2
        class:String;
        board:String;
        stream:String;
        subjects:string[];
        optional_subject:String;
        name:String;
        middle_name:String;
        last_name:String;
        dob:Date;
        place_of_birth:String;
        gender:String;
        contact_person_name:String;
        contact_person_mobile:Number;
        contact_person_email:String;
        secondary_contact_no:Number;
        h_no_and_streets:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        religion:String;
        blood_group:String;
        caste:String;
        category:String;
        is_ews:Boolean;
        sibling:Boolean;
        transport:String;
        nationality:String;
    };

    // Parents
    parents:{
        // Father
        father:{
            father_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date,
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            parent_status:String;
        },
        // Mother
        mother:{
            mother_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date;
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            anniversary_date:Date;
        }
    };

    // Other details
    others:{
        // 1
        student_other_details:{
            medical_history:String;
            descriptions:String;
            allergies:String;
            allergies_causes:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:String;
            no_of_living_year:Number;
            only_child:String;
            general_description:String;
        },
        // 2
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        // 3
        is_alumni:{
            is_alumni:Boolean;
            academic_session:String;
            class_name:String;
            admission_number:Number;
        },
        // 4
        previous_school_details:any;
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        company_name:String;
        business_details:String;
        qualification:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            legal_custody_of_the_child:String;
            correspondence_to:String;
            check_id_applicable:String;
            separation_reason:String;
        }
    };


    // Siblings
    siblings:any;


    // Paymode details
    paymode_details:{
        cheque_no:String;
        cheque_date:Date;
        cheque_bank:String;
        dd_no:String;
        dd_date:Date;
        dd_bank:String;
        branch_name:String;
        deposit_bank:String;
        neft_name:String;
    };
};
// Create student
export const createStudent = async ({student, parents, others, guardian_details, siblings, paymode_details}:CreateStudentProps) => {
    try {


        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the register number already exists
        const existingStudent = await Student.findOne({'student.reg_no':student.reg_no, session:activeSession?.year_name});
        if(existingStudent){
            throw new Error('Register no. already exists');
        };


        // Creating new student
        const newStudent = await Student.create({
            session:activeSession?.year_name,
            student:{
                // 1
                is_up_for_admission:false,
                is_online:student.is_online,
                image:student.image,
                enquiry_no:student.enquiry_no,
                reg_no:student.reg_no,
                pros_no:student.pros_no,
                amount:student.amount,
                date:student.date,
                payment_mode:student.payment_mode,
                admission_account:student.admission_account,
                post_account:student.post_account,
                // 2
                class:student.class,
                board:student.board,
                stream:student.stream,
                subjects:student.subjects,
                optional_subject:student.optional_subject,
                name:student.name,
                middle_name:student.middle_name,
                last_name:student.last_name,
                dob:student.dob,
                place_of_birth:student.place_of_birth,
                gender:student.gender,
                contact_person_name:student.contact_person_name,
                contact_person_mobile:student.contact_person_mobile,
                contact_person_email:student.contact_person_email,
                secondary_contact_no:student.secondary_contact_no,
                h_no_and_streets:student.h_no_and_streets,
                email:student.email,
                city:student.city,
                mobile:student.mobile,
                state:student.state,
                pin_code:student.pin_code,
                aadhar_card_no:student.aadhar_card_no,
                religion:student.religion,
                blood_group:student.blood_group,
                caste:student.caste,
                category:student.category,
                is_ews:student.is_ews,
                sibling:student.sibling,
                transport:student.transport,
                nationality:student.nationality
            },
            parents,
            others,
            guardian_details,
            siblings,
            paymode_details
        });
        newStudent.save().then(async () => {
            await Student.findOneAndUpdate({'student.reg_no':student.reg_no, session:activeSession?.year_name}, {'student.subjects':student.subjects});
        });


        // Updating subjects
        const subjectsAffected = await Subject.find({subject_name:student.subjects, is_university:true, session:activeSession?.year_name});
        subjectsAffected.map(async s => {
            await Subject.updateMany({'subject_name':s.subject_name, session:activeSession?.year_name}, {available_seats:s.available_seats - 1});
        });


        // Return
        return 'Created';


    } catch (err:any) {
        console.log(`Error creating student: ${err.message}`);
    };
};





// Fetch students
export const fetchStudents = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const students = await Student.find({session:activeSession?.year_name});
        return students;

    } catch (err:any) {
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Modify student props
interface ModifyStudentProps{
    id:String;
    // Student
    student:{
        // 1
        is_up_for_admission:Boolean;
        is_online:Boolean;
        image:String;
        enquiry_no:String;
        reg_no:String;
        pros_no:String;
        amount:Number;
        date:Date;
        payment_mode:String;
        admission_account:String;
        post_account:String;
        // 2
        class:String;
        board:String;
        stream:String;
        subjects:string[];
        optional_subject:String;
        name:String;
        middle_name:String;
        last_name:String;
        dob:Date;
        place_of_birth:String;
        gender:String;
        contact_person_name:String;
        contact_person_mobile:Number;
        contact_person_email:String;
        secondary_contact_no:Number;
        h_no_and_streets:String;
        email:String;
        city:String;
        mobile:Number;
        state:String;
        pin_code:Number;
        aadhar_card_no:Number;
        religion:String;
        blood_group:String;
        caste:String;
        category:String;
        is_ews:Boolean;
        sibling:Boolean;
        transport:String;
        nationality:String;
    };

    // Parents
    parents:{
        // Father
        father:{
            father_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date,
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            parent_status:String;
        },
        // Mother
        mother:{
            mother_name:String;
            middle_name:String;
            last_name:String;
            profession:String;
            designation:String;
            residence_address:String;
            office_address:String;
            email:String;
            alternate_email:String;
            dob:Date;
            mobile:Number;
            phone:Number;
            company_name:String;
            business_details:String;
            qualification:String;
            service_in:String;
            office_phone:Number;
            office_mobile:Number;
            office_extension:String;
            office_email:String;
            office_website:String;
            annual_income:String;
            anniversary_date:Date;
        }
    };

    // Other details
    others:{
        // 1
        student_other_details:{
            medical_history:String;
            descriptions:String;
            allergies:String;
            allergies_causes:String;
            family_doctor_name:String;
            family_doctor_phone:Number;
            family_doctor_address:String;
            distance_from_home:String;
            no_of_living_year:Number;
            only_child:String;
            general_description:String;
        },
        // 2
        student_staff_relation:{
            staff_ward:String;
            staff_name:String;
        },
        is_alumni:{
            is_alumni:Boolean;
            academic_session:String;
            class_name:String;
            admission_number:Number;
        },
        // 3
        previous_school_details:any;
    };

    // Guardian details
    guardian_details:{
        // 1
        guardian_name:String;
        profession:String;
        designation:String;
        company_name:String;
        business_details:String;
        qualification:String;
        // 2
        if_single_parent:{
            student_lives_with:String;
            legal_custody_of_the_child:String;
            correspondence_to:String;
            check_id_applicable:String;
            separation_reason:String;
        }
    };

    // Siblings
    siblings:any;


    // Paymode details
    paymode_details:{
        cheque_no:String;
        cheque_date:Date;
        cheque_bank:String;
        dd_no:String;
        dd_date:Date;
        dd_bank:String;
        branch_name:String;
        deposit_bank:String;
        neft_name:String;
    };
}
// Modify student
export const modifyStudent = async ({id, student, parents, others, guardian_details, siblings, paymode_details}:ModifyStudentProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Checking if the register no. already exists
        const students = await Student.find({session:activeSession?.year_name});
        const existingStudent = await Student.findById(id);
        if(existingStudent.student.reg_no !== student.reg_no && students.map(student => student.student.reg_no).includes(student.reg_no)){throw new Error('Register no. already exists')};


        // Update student
        await Student.findByIdAndUpdate(id, {student, parents, others, guardian_details, siblings, paymode_details}, {new:true});
        
        
        // Subjects handling
        const previousSubjects = await Subject.find({subject_name:existingStudent.student.subjects, is_university:true, session:activeSession?.year_name});
        const newSubjects = await Subject.find({subject_name:student.subjects, is_university:true, session:activeSession?.year_name});
        

        // Additional subjects
        const additionalSubjects = newSubjects.filter(s => !previousSubjects.map(subject => subject.subject_name).includes(s.subject_name));
        if(additionalSubjects.length > 0){
            additionalSubjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name, session:activeSession?.year_name}, {available_seats:s.available_seats - 1});
            });
        };


        // Substracted subjects
        const subtractedSubjects = previousSubjects.filter(s => !newSubjects.map(subject => subject.subject_name).includes(s.subject_name));
        if(subtractedSubjects.length > 0){
            subtractedSubjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name, session:activeSession?.year_name}, {available_seats:s.available_seats + 1});
            });
        };


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating student: ${err}`);
    };
};





// Delete student
export const deleteStudent = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Adding subject available seats
        const student = await Student.findById(id);
        const subjects = await Subject.find({subject_name:student.student.subjects, is_university:true});
        if(subjects.length > 0){
            subjects.map(async s => {
                await Subject.updateMany({'subject_name':s.subject_name}, {available_seats:s.available_seats + 1});
            });
        };


        // Deleting student
        await Student.findByIdAndDelete(id);
        return 'Student Deleted';

    } catch (err) {
        throw new Error(`Error deleting student: ${err}`);
    };
};





// Fetch students in a class
export const fetchClassStudents = async ({class_name}:{class_name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching students
        const students = await Student.find({'student.class':class_name, 'student.is_up_for_admission':false, session:activeSession?.year_name});


        // Return
        return students;

    } catch (err) {
        throw new Error(`Error deleting student: ${err}`);
    };
};





// Fetch classes students
export const fetchClassesStudents = async ({classes_names}:{classes_names:any}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching students where 'student.class' is in the class_names array
        const students = await Student.find({ 
            'student.class':{$in:classes_names},
            'student.is_up_for_admission':false,
            session:activeSession?.year_name
        });


        // Return
        return students;

    }catch(err){
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Apply student for admission props
interface ApplyStudentForAdmissionProps{
    reg_nos:string[];
}
// Apply student for admission
export const applyStudentForAdmission = async ({reg_nos}:ApplyStudentForAdmissionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Update student
        reg_nos.map(async no => {
            const updatedStudents = await Student.updateMany(
                {'student.reg_no':no, session:activeSession?.year_name},
                {'student.is_up_for_admission':true}
            );
            return updatedStudents;
        });
    

    } catch (err) {
        throw new Error(`Error updating student: ${err}`);
    };
};





// Fetch manual list students
export const fetchManualListStudents = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const students = await Student.find({'student.is_up_for_admission':true, session:activeSession?.year_name});
        return students;

    } catch (err:any) {
        throw new Error(`Error fetching students: ${err}`);
    };
};





// Fetch student by reg no
export const fetchStudentByRegNo = async ({reg_no}:{reg_no:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching student
        const student = await Student.findOne({'student.reg_no':reg_no, session:activeSession?.year_name});


        // Return
        return student;

    } catch (err) {
        throw new Error(`Error deleting student: ${err}`);
    };
};





// Fetch students online and offline registrations
// export const fetchStudentsOnlineAndOfflineRegistrations = async () => {
//     try {

//         // Db connection
//         connectToDb('accounts');


//         // Acive session
//         const activeSession = await AcademicYear.findOne({is_active:true});


//         // All students count
//         const allStudentsCount = await Student.countDocuments({session:activeSession?.year_name});


//         // Online count
//         const onlineCount = await Student.countDocuments({session:activeSession?.year_name, 'student.is_online':true});


//         // Offline count
//         const offlineCount = await Student.countDocuments({session:activeSession?.year_name, 'student.is_online':false});


//         // Return
//         return {
//             all_students_count:allStudentsCount,
//             online_count:onlineCount,
//             offline_count:offlineCount
//         };
        
//     }catch (err){
//         throw new Error(`Error fetching students online and offline counts: ${err}`);
//     };
// };
// Developer code
export const fetchStudentsOnlineAndOfflineRegistrations = async () => {
    try {
      // Db connection
      connectToDb("accounts");
  
      // Active session
      const activeSession = await AcademicYear.findOne({ is_active: true });
  
      // Parallel execution of queries
      const [allStudentsCount, onlineCount, offlineCount] = await Promise.all([
        Student.countDocuments({ session: activeSession?.year_name }),
        Student.countDocuments({
          session: activeSession?.year_name,
          "student.is_online": true,
        }),
        Student.countDocuments({
          session: activeSession?.year_name,
          "student.is_online": false,
        }),
      ]);
  
      // Return
      return {
        all_students_count: allStudentsCount,
        online_count: onlineCount,
        offline_count: offlineCount,
      };
    } catch (err) {
      throw new Error(
        `Error fetching students online and offline counts: ${err}`
      );
    }
  };





// Fetch students registration fees
export const fetchStudentsRegistrationFees = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // All students count
        const studentsAmounts = await Student.find({session:activeSession?.year_name}, {'createdAt':1, 'student.name':1, 'student.class':1, 'student.section':1, 'student.image':1, 'student.amount':1, 'student.payment_mode':1});


        // Return
        return studentsAmounts;
        
    }catch (err){
        throw new Error(`Error fetching students registration fees: ${err}`);
    };
};