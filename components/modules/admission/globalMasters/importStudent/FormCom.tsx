'use client';
// Imports
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {AuthContext} from '@/context/AuthContext';
import {useToast} from '@/components/ui/use-toast';
import {useContext, useEffect, useState} from 'react';
import LoadingIcon from '@/components/utils/LoadingIcon';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {fetchWings} from '@/lib/actions/fees/globalMasters/defineClassDetails/wing.actions';
import {fetchCategoriesNames} from '@/lib/actions/admission/globalMasters/category.actions';
import {createAdmittedStudent} from '@/lib/actions/admission/admission/admittedStudent.actions';





// Main function
const FormCom = ({}:any) => {

    // User
    const {user} = useContext(AuthContext);


    // Permissions
    const [permissions, setPermissions] = useState({
        add:false,
        modify:false,
        delete:false,
        print:false,
        read_only:false
    });


    // Toast
    const {toast} = useToast();


    // Wings
    const [wings, setWings] = useState([]);


    // Categories
    const [categories, setCategories] = useState([]);


    // Upload method
    const [uploadMethod, setUploadMethod] = useState('Excel To Online');


    // Is loading
    const [isLoading, setIsLoading] = useState(false);


    // Selected file
    const [file, setFile] = useState(null);


    // Excel into json converter
    const excelToJson = (file:any) => {
        return new Promise((resolve, reject) => {
            try{
               
                // TODO: update the excel to json logic

            }catch (error){
                reject(error);
            };
        });
    };



    // Convert arrays into objects
    const convertArraysIntoObjects = (data:any) => {
        const [keys, ...values] = data.Sheet1;
        const objectsArray = values.map((row:any) => {
            const obj = {};
            keys.forEach((key:any, index:any) => {
                obj[key] = row[index];
            });
            return obj;
        });
    
        return objectsArray;
    };
  

    // Handle upload
    const handleUpload = async () => {
        try{

            // Empty file check
            setIsLoading(false);
            if(!file){
                toast({title:'Please selected file', variant:'alert'});
                return;  
            };


            // Turning excel into json objects
            const data = await excelToJson(file);
            const arrayObjects = convertArraysIntoObjects(data);


            // Renaming keys
            const renameKeys = (objectsArray:any, keyMap:any) => {
                return objectsArray.map((obj:any) => {
                    const newObj = {};
                    for (const key in obj) {
                        if(Object.hasOwnProperty.call(obj, key)){
                            const newKey = keyMap[key];
                            if(newKey){
                                newObj[newKey] = obj[key];
                            }
                        }
                    }
                    return newObj;
                });
            };
            const newKeys = {
                'AdmissionNo':'student.adm_no',
                'Name':'student.name',
                'ClassID':'student.class',
                'SectionID':'student.section',
                'WingsID':'student.wing',
                'TransportType':'student.transport',
                'Roll_No':'student.roll_no',
                'StudentPEN':'student.pen_no',
                'House_Id':'student.house',
                'DOB':'student.dob',
                'DOA':'student.doa',
                'DOJ':'student.doj',
                'Address':'student.h_no_and_streets',
                'StudentMobile':'student.mobile',
                'photo':'student.image',
                'BloodGroup':'student.blood_group',
                'ReligionID':'student.religion',
                'Nationality':'student.nationality',
                'Gender':'student.gender',
                'Active':'student.is_active',
                'CategoryID':'student.category',
                'IsNew':'student.is_new',
                'CasteID':'student.caste',
                'CurrentStatus':'student.student_status',
                'IsEWS':'student.is_ews',
                'Sibling':'student.sibling',
                'FatherName':'parents.father.father_name',
                'FatherDesignation':'parents.father.designation',
                'FatherPhone':'parents.father.phone',
                'MotherName':'parents.mother.mother_name',
                'MotherDesignation':'parents.mother.designation',
                'MotherPhone':'parents.mother.phone',
                'MotherDOB':'parents.mother.dob'
            };
            const renamedObjectKeys = renameKeys(arrayObjects, newKeys);


            // Turning the object into the student model structure
            const studentStructureConverter = (data:any) => {
                return data.map(item => {
                    return {
                        parents: {
                            father: {
                                designation: item['parents.father.designation'],
                                father_name: item['parents.father.father_name'],
                                phone: item['parents.father.phone']
                            },
                            mother: {
                                designation: item['parents.mother.designation'],
                                dob: item['parents.mother.dob'],
                                mother_name: item['parents.mother.mother_name'],
                                phone: item['parents.mother.phone']
                            }
                        },
                        student: {
                            adm_no: item['student.adm_no'],
                            blood_group: item['student.blood_group'],
                            caste: item['student.caste'],
                            category: item['student.category'],
                            class: item['student.class'],
                            doa: item['student.doa'],
                            dob: item['student.dob'],
                            doj: item['student.doj'],
                            gender: item['student.gender'],
                            h_no_and_streets: item['student.h_no_and_streets'],
                            house: item['student.house'],
                            is_active: item['student.is_active'] == 1 ? true : false,
                            is_ews: item['student.is_ews'] == 1 ? true : false,
                            is_new: item['student.is_new'] == 1 ? true : false,
                            mobile: item['student.mobile'],
                            name: item['student.name'],
                            nationality: item['student.nationality'],
                            pen_no: item['student.pen_no'],
                            religion: item['student.religion'],
                            roll_no: item['student.roll_no'],
                            section: item['student.section'],
                            wing: wings[Number(item['student.wing']) + 1],
                            sibling: item['student.sibling'],
                            student_status: item['student.student_status'],
                            transport: item['student.transport']
                        }
                    };
                });
            };
            const extractedData = studentStructureConverter(renamedObjectKeys);


            // Data as the student model
            const studentModelConverter = (extractedDataArray:any) => {
                const today = new Date();
                // Numbers to data converter
                const convertToDate = (number:any) => {
                    if (typeof number === 'number' && !isNaN(number)) {
                        return new Date(number * 86400 * 1000);
                    } else {
                        return today;
                    }
                }
                const studentModels = extractedDataArray.map((extractedData:any) => {
                    return {
                        student: {
                            section: extractedData?.student?.section || '',
                            wing: extractedData?.student?.wing || '',
                            adm_no: extractedData?.student?.adm_no || '',
                            pen_no: extractedData?.student?.pen_no || '',
                            par_id: extractedData?.student?.par_id || '',
                            roll_no: extractedData?.student?.roll_no || '',
                            bill_no: extractedData?.student?.bill_no || '',
                            is_university: extractedData?.student?.is_university == 1,
                            re_adm_no: extractedData?.student?.re_adm_no || '',
                            is_minority: extractedData?.student?.is_minority == 1,
                            is_disability: extractedData?.student?.is_disability == 1,
                            dis_disc: extractedData?.student?.dis_disc || '',
                            is_new: extractedData?.student?.is_new == 1,
                            is_active: extractedData?.student?.is_active == 1,
                            reason: extractedData?.student?.reason || '',
                            is_only_child: extractedData?.student?.is_only_child == 1,
                            student_status: extractedData?.student?.student_status || '',
                            house: extractedData?.student?.house || '',
                            doa: convertToDate(extractedData?.student?.doa) || today,
                            doj: convertToDate(extractedData?.student?.doj) || today,
                            admitted_class: extractedData?.student?.admitted_class || '',
                            image: extractedData?.student?.image || '',
                            stream: extractedData?.student?.stream || '',
                            subjects: extractedData?.student?.subjects || [],
                            optional_subject: extractedData?.student?.optional_subject || '',
                            class: extractedData?.student?.class || '',
                            board: extractedData?.student?.board || '',
                            name: extractedData?.student?.name || '',
                            middle_name: extractedData?.student?.middle_name || '',
                            last_name: extractedData?.student?.last_name || '',
                            dob: convertToDate(extractedData?.student?.dob) || today,
                            place_of_birth: extractedData?.student?.place_of_birth || '',
                            // @ts-ignore
                            gender: extractedData?.student?.gender == 1 ? 'Male' : 'Female' || '',
                            contact_person_name: extractedData?.student?.contact_person_name || '',
                            contact_person_mobile: extractedData?.student?.contact_person_mobile || 0,
                            contact_person_email: extractedData?.student?.contact_person_email || '',
                            secondary_contact_no: extractedData?.student?.secondary_contact_no || 0,
                            h_no_and_streets: extractedData?.student?.h_no_and_streets || '',
                            locality: extractedData?.student?.locality || '',
                            email: extractedData?.student?.email || '',
                            city: extractedData?.student?.city || '',
                            mobile: extractedData?.student?.mobile || 0,
                            state: extractedData?.student?.state || '',
                            pin_code: extractedData?.student?.pin_code || 0,
                            aadhar_card_no: extractedData?.student?.aadhar_card_no || 0,
                            whats_app_no: extractedData?.student?.whats_app_no || 0,
                            religion: extractedData?.student?.religion || '',
                            parish: extractedData?.student?.parish || '',
                            caste: extractedData?.student?.caste || '',
                            // category: extractedData?.student?.category || '',
                            category: categories[Number(extractedData?.student?.category) + 1]?.category_name || '',
                            blood_group: extractedData?.student?.blood_group || '',
                            cadet_type: extractedData?.student?.cadet_type || '',
                            club: extractedData?.student?.club || '',
                            is_ews: extractedData?.student?.is_ews == 1,
                            is_rte: extractedData?.student?.is_rte == 1,
                            sibling: extractedData?.student?.sibling || false,
                            transport: extractedData?.student?.transport || '',
                            nationality: extractedData?.student?.nationality || '',
                        },
                        parents: {
                            father: {
                                father_name: extractedData?.parents?.father?.father_name || '',
                                middle_name: extractedData?.parents?.father?.middle_name || '',
                                last_name: extractedData?.parents?.father?.last_name || '',
                                profession: extractedData?.parents?.father?.profession || '',
                                designation: extractedData?.parents?.father?.designation || '',
                                residence_address: extractedData?.parents?.father?.residence_address || '',
                                office_address: extractedData?.parents?.father?.office_address || '',
                                email: extractedData?.parents?.father?.email || '',
                                alternate_email: extractedData?.parents?.father?.alternate_email || '',
                                dob: extractedData?.parents?.father?.dob || today,
                                mobile: extractedData?.parents?.father?.mobile || 0,
                                phone: extractedData?.parents?.father?.phone || 0,
                                company_name: extractedData?.parents?.father?.company_name || '',
                                business_details: extractedData?.parents?.father?.business_details || '',
                                qualification: extractedData?.parents?.father?.qualification || '',
                                service_in: extractedData?.parents?.father?.service_in || '',
                                office_phone: extractedData?.parents?.father?.office_phone || 0,
                                office_mobile: extractedData?.parents?.father?.office_mobile || 0,
                                office_extension: extractedData?.parents?.father?.office_extension || '',
                                office_email: extractedData?.parents?.father?.office_email || '',
                                office_website: extractedData?.parents?.father?.office_website || '',
                                annual_income: extractedData?.parents?.father?.annual_income || '',
                                parent_status: extractedData?.parents?.father?.parent_status || '',
                            },
                            mother: {
                                mother_name: extractedData?.parents?.mother?.mother_name || '',
                                middle_name: extractedData?.parents?.mother?.middle_name || '',
                                last_name: extractedData?.parents?.mother?.last_name || '',
                                profession: extractedData?.parents?.mother?.profession || '',
                                designation: extractedData?.parents?.mother?.designation || '',
                                residence_address: extractedData?.parents?.mother?.residence_address || '',
                                office_address: extractedData?.parents?.mother?.office_address || '',
                                email: extractedData?.parents?.mother?.email || '',
                                alternate_email: extractedData?.parents?.mother?.alternate_email || '',
                                dob: extractedData?.parents?.mother?.dob || today,
                                mobile: extractedData?.parents?.mother?.mobile || 0,
                                phone: extractedData?.parents?.mother?.phone || 0,
                                company_name: extractedData?.parents?.mother?.company_name || '',
                                business_details: extractedData?.parents?.mother?.business_details || '',
                                qualification: extractedData?.parents?.mother?.qualification || '',
                                service_in: extractedData?.parents?.mother?.service_in || '',
                                office_phone: extractedData?.parents?.mother?.office_phone || 0,
                                office_mobile: extractedData?.parents?.mother?.office_mobile || 0,
                                office_extension: extractedData?.parents?.mother?.office_extension || '',
                                office_email: extractedData?.parents?.mother?.office_email || '',
                                office_website: extractedData?.parents?.mother?.office_website || '',
                                annual_income: extractedData?.parents?.mother?.annual_income || '',
                                anniversary_date: convertToDate(extractedData?.parents?.mother?.anniversary_date) || today,
                            },
                        },
                        health_details: {
                            height: extractedData?.health_details?.height || 0,
                            weight: extractedData?.health_details?.weight || 0,
                        },
                        others: {
                            student_other_details: {
                                medical_history: extractedData?.others?.student_other_details?.medical_history || '',
                                descriptions: extractedData?.others?.student_other_details?.descriptions || '',
                                allergies: extractedData?.others?.student_other_details?.allergies || '',
                                allergies_causes: extractedData?.others?.student_other_details?.allergies_causes || '',
                                family_doctor_name: extractedData?.others?.student_other_details?.family_doctor_name || '',
                                family_doctor_phone: extractedData?.others?.student_other_details?.family_doctor_phone || 0,
                                family_doctor_address: extractedData?.others?.student_other_details?.family_doctor_address || '',
                                distance_from_home: extractedData?.others?.student_other_details?.distance_from_home || 0,
                                no_of_living_year: extractedData?.others?.student_other_details?.no_of_living_year || 0,
                                only_child: extractedData?.others?.student_other_details?.only_child || '',
                                general_description: extractedData?.others?.student_other_details?.general_description || '',
                            },
                            student_staff_relation: {
                                staff_ward: extractedData?.others?.student_staff_relation?.staff_ward || '',
                                staff_name: extractedData?.others?.student_staff_relation?.staff_name || '',
                            },
                            is_alumni: {
                                is_alumni: extractedData?.others?.is_alumni?.is_alumni || false,
                                academic_session: extractedData?.others?.is_alumni?.academic_session || '',
                                class_name: extractedData?.others?.is_alumni?.class_name || '',
                                admission_number: extractedData?.others?.is_alumni?.admission_number || 0,
                            },
                            previous_school_details: extractedData?.others?.previous_school_details || [],
                        },
                        guardian_details: {
                            guardian_name: extractedData?.guardian_details?.guardian_name || '',
                            profession: extractedData?.guardian_details?.profession || '',
                            designation: extractedData?.guardian_details?.designation || '',
                            company_name: extractedData?.guardian_details?.company_name || '',
                            business_details: extractedData?.guardian_details?.business_details || '',
                            qualification: extractedData?.guardian_details?.qualification || '',
                            if_single_parent: {
                                student_lives_with: extractedData?.guardian_details?.if_single_parent?.student_lives_with || '',
                                legal_custody_of_the_child: extractedData?.guardian_details?.if_single_parent?.legal_custody_of_the_child || '',
                                correspondence_to: extractedData?.guardian_details?.if_single_parent?.correspondence_to || '',
                                check_id_applicable: extractedData?.guardian_details?.if_single_parent?.check_id_applicable || '',
                                separation_reason: extractedData?.guardian_details?.if_single_parent?.separation_reason || '',
                            },
                        },
                        documents: extractedData?.documents || [],
                        affiliated_heads: {
                            group_name: extractedData?.affiliated_heads?.group_name || '',
                            heads: extractedData?.affiliated_heads?.heads || [],
                        },
                        transport_details: {
                            route: extractedData?.transport_details?.route || '',
                            stop: extractedData?.transport_details?.stop || '',
                            vehicle: extractedData?.transport_details?.vehicle || '',
                            months: extractedData?.transport_details?.months || [],
                        },
                    };
                });
                return studentModels;
            };
            const dataAsStudentModel = studentModelConverter(extractedData);


            // Submitting data
            dataAsStudentModel.map(async (s:any) => {
                const res = await createAdmittedStudent({
                    // Student
                    student:{
                        // Admission data
                        section:s.student.section,
                        // wing:s.student.wing,
                        adm_no:s.student.adm_no,
                        pen_no:s.student.pen_no,
                        par_id:s.student.par_id,
                        roll_no:s.student.roll_no,
                        bill_no:s.student.bill_no,
                        is_university:s.student.is_university,
                        re_adm_no:s.student.re_adm_no,
                        is_minority:s.student.is_minority,
                        is_disability:s.student.is_disability,
                        dis_disc:s.student.dis_disc,
                        is_new:s.student.is_new,
                        is_active:s.student.is_active,
                        reason:s.student.reason,
                        is_only_child:s.student.is_only_child,
                        student_status:s.student.student_status,
                        house:s.student.house,
                        doa:s.student.doa,
                        doj:s.student.doj,
                        admitted_class:s.student.admitted_class,
                        // 1
                        image:s.student.image,
                        // 2
                        stream:s.student.stream,
                        subjects:s.student.subjects,
                        optional_subject:s.student.optional_subject,
                        class:s.student.class,
                        board:s.student.board,
                        name:s.student.name,
                        middle_name:s.student.middle_name,
                        last_name:s.student.last_name,
                        dob:s.student.dob,
                        place_of_birth:s.student.place_of_birth,
                        gender:s.student.gender,
                        contact_person_name:s.student.contact_person_name,
                        contact_person_mobile:s.student.contact_person_mobile,
                        contact_person_email:s.student.contact_person_email,
                        secondary_contact_no:s.student.secondary_contact_no,
                        h_no_and_streets:s.student.h_no_and_streets,
                        locality:s.student.locality,
                        email:s.student.email,
                        city:s.student.city,
                        mobile:s.student.mobile,
                        state:s.student.state,
                        pin_code:s.student.pin_code,
                        aadhar_card_no:s.student.aadhar_card_no,
                        whats_app_no:s.student.whats_app_no,
                        religion:s.student.religion,
                        parish:s.student.parish,
                        caste:s.student.caste,
                        category:s.student.category,
                        blood_group:s.student.blood_group,
                        cadet_type:s.student.cadet_type,
                        club:s.student.club,
                        is_ews:s.student.is_ews,
                        is_rte:s.student.is_rte,
                        sibling:s.student.sibling,
                        transport:s.student.transport,
                        nationality:s.student.nationality
                    },
    
                    // Parents
                    parents:{
                        // Father
                        father:{
                            father_name:s.parents.father.father_name,
                            middle_name:s.parents.father.middle_name,
                            last_name:s.parents.father.last_name,
                            profession:s.parents.father.profession,
                            designation:s.parents.father.designation,
                            residence_address:s.parents.father.residence_address,
                            office_address:s.parents.father.office_address,
                            email:s.parents.father.email,
                            alternate_email:s.parents.father.alternate_email,
                            dob:s.parents.father.dob,
                            mobile:s.parents.father.mobile,
                            phone:s.parents.father.phone,
                            company_name:s.parents.father.company_name,
                            business_details:s.parents.father.business_details,
                            qualification:s.parents.father.qualification,
                            service_in:s.parents.father.service_in,
                            office_phone:s.parents.father.office_phone,
                            office_mobile:s.parents.father.office_mobile,
                            office_extension:s.parents.father.office_extension,
                            office_email:s.parents.father.office_email,
                            office_website:s.parents.father.office_website,
                            annual_income:s.parents.father.annual_income,
                            parent_status:s.parents.father.parent_status
                        },
                        // Mother
                        mother:{
                            mother_name:s.parents.mother.mother_name,
                            middle_name:s.parents.mother.middle_name,
                            last_name:s.parents.mother.last_name,
                            profession:s.parents.mother.profession,
                            designation:s.parents.mother.designation,
                            residence_address:s.parents.mother.residence_address,
                            office_address:s.parents.mother.office_address,
                            email:s.parents.mother.email,
                            alternate_email:s.parents.mother.alternate_email,
                            dob:s.parents.mother.dob,
                            mobile:s.parents.mother.mobile,
                            phone:s.parents.mother.phone,
                            company_name:s.parents.mother.company_name,
                            business_details:s.parents.mother.business_details,
                            qualification:s.parents.mother.qualification,
                            service_in:s.parents.mother.service_in,
                            office_phone:s.parents.mother.office_phone,
                            office_mobile:s.parents.mother.office_mobile,
                            office_extension:s.parents.mother.office_extension,
                            office_email:s.parents.mother.office_email,
                            office_website:s.parents.mother.office_website,
                            annual_income:s.parents.mother.annual_income,
                            anniversary_date:s.parents.mother.anniversary_date
                        }
                    },
    
                    // Other details
                    others:{
                        // 1
                        student_other_details:{
                            medical_history:s.others.student_other_details.medical_history,
                            descriptions:s.others.student_other_details.descriptions,
                            allergies:s.others.student_other_details.allergies,
                            allergies_causes:s.others.student_other_details.allergies_causes,
                            family_doctor_name:s.others.student_other_details.family_doctor_name,
                            family_doctor_phone:s.others.student_other_details.family_doctor_phone,
                            family_doctor_address:s.others.student_other_details.family_doctor_address,
                            distance_from_home:s.others.student_other_details.distance_from_home,
                            no_of_living_year:s.others.student_other_details.no_of_living_year,
                            only_child:s.others.student_other_details.only_child,
                            general_description:s.others.student_other_details.general_description,
                        },
                        // 2
                        student_staff_relation:{
                            staff_ward:s.others.student_staff_relation.staff_ward,
                            staff_name:s.others.student_staff_relation.staff_name
                        },
                        // 3
                        is_alumni:{
                            is_alumni:s.others.is_alumni.is_alumni,
                            academic_session:s.others.is_alumni.academic_session,
                            class_name:s.others.is_alumni.class_name,
                            admission_number:s.others.is_alumni.admission_number
                        },
                        // 4
                        previous_school_details:[
                            {
                                school_name:s.others.previous_school_details[0]?.school_name,
                                board:s.others.previous_school_details[0]?.board,
                                passing_year:s.others.previous_school_details[0]?.passing_year,
                                total_marks:s.others.previous_school_details[0]?.total_marks,
                                percentage:s.others.previous_school_details[0]?.percentage,
                                result:s.others.previous_school_details[0]?.result
                            }
                        ]
                    },
    
                    // Guardian details
                    guardian_details:{
                        // 1
                        guardian_name:s.guardian_details.guardian_name,
                        profession:s.guardian_details.profession,
                        designation:s.guardian_details.designation,
                        company_name:s.guardian_details.company_name,
                        business_details:s.guardian_details.business_details,
                        qualification:s.guardian_details.qualification,
                        // 2
                        if_single_parent:{
                            student_lives_with:s.guardian_details.if_single_parent.student_lives_with,
                            legal_custody_of_the_child:s.guardian_details.if_single_parent.legal_custody_of_the_child,
                            correspondence_to:s.guardian_details.if_single_parent.correspondence_to,
                            check_id_applicable:s.guardian_details.if_single_parent.check_id_applicable,
                            separation_reason:s.guardian_details.if_single_parent.separation_reason
                        }
                    },
    
                    // Documents
                    documents:s.documents
                });
                if(res === 0){
                    toast({title:'Please create a session first', variant:'alert'});
                    return;
                };
            });
            toast({title:'File uploaded successfully'});
            setIsLoading(false);

        }catch (err) {
            console.log(err);
            toast({title:'Error uploading file', variant:'error'});
        };
    };


    // Use effect
    useEffect(() => {
        const fetcher = async () => {
            const wingsRes = await fetchWings();
            const categoriesRes = await fetchCategoriesNames();
            setWings(wingsRes.map((w:any) => w.wing));
            setCategories(categoriesRes);
        };
        fetcher();
    }, []);
    useEffect(() => {
        const grantedPermissions = user?.permissions?.find((p:any) => p.name === 'Admission')?.permissions?.find((pp:any) => pp.sub_menu === 'Import Student');
        setPermissions(grantedPermissions);
    }, [user]);    

    return (
        <div className='w-[90%] max-w-[800px] flex flex-col items-center pb-6 rounded-[8px] border-[0.5px] border-[#E8E8E8] sm:w-[80%]'>
            <h2 className='w-full text-center py-2 text-sm rounded-t-[8px] font-bold bg-[#e7f0f7] text-main-color'>Upload Data Option</h2>


            <div className='relative w-full flex flex-col pt-4 gap-3 items-center px-2 sm:px-4'>


                {/* Upload method */}
                <RadioGroup
                    className='w-full flex flex-row items-center justify-center gap-4 pb-2 border-b-[0.5px] border-[#ccc]'
                    defaultValue={uploadMethod}
                >
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='Excel To Online' id='Excel To Online' onClick={() => setUploadMethod('Excel To Online')} checked={uploadMethod === 'Excel To Online'}/>
                        <Label htmlFor='Excel To Online' className='text-xs'>Excel To Online</Label>
                    </div>
                    <div className='flex items-center space-x-[2px]'>
                        <RadioGroupItem value='Offline To Online' id='Offline To Online' onClick={() => setUploadMethod('Offline To Online')} checked={uploadMethod === 'Offline To Online'}/>
                        <Label htmlFor='Offline To Online' className='text-xs'>Offline To Online</Label>
                    </div>
                </RadioGroup>


                {/* Uploading */}
                {uploadMethod === 'Excel To Online' ? (
                    <div className='w-full flex flex-row items-center justify-center gap-4 pt-6'>
                        {/* Student Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Student Details:</p>
                            <input
                                type='file'
                                accept='.xlsx, .xls'
                                className='text-xs'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {permissions.add && isLoading ? (
                                <LoadingIcon />
                            ) : (
                                <div className='flex flex-col gap-4 underline'>
                                    <span
                                        onClick={handleUpload}
                                        className='flex items-center justify-center px-4 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                                hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                                    >
                                        Save
                                    </span>
                                    <a
                                        href='/files/import-student-sample.xlsx'
                                        download='import-student-sample.xlsx'
                                        className='text-xs text-main-color'
                                    >
                                        Download excel file sample
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Staff Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Staff Details:</p>
                            <input
                                type='file'
                                accept='.xlsx, .xls'
                                className='text-xs'
                            />
                            <span
                                className='flex items-center justify-center px-4 mb-9 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Save
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className='w-full flex flex-row items-center justify-center gap-4'>
                        {/* Staff Details */}
                        <div className='flex-1 flex flex-col justify-start gap-3'>
                            <p className='text-xs text-hash-color'>Staff Details:</p>

                            <div className='flex flex-col items-start justify-center max-w-[200px]'>
                                <p className='basis-auto pr-2 text-end text-xs text-[#726E71] sm:basis-[30%]'>DB Name</p>
                                <div className='w-full flex flex-col items-start gap-4 sm:basis-[70%]'>
                                    <Input
                                        className='flex flex-row h-8 items-center text-xs pl-2 bg-[#FAFAFA] border-[0.5px] border-[#E4E4E4]'
                                    />
                                </div>
                            </div>
                            <span
                                className='flex items-center justify-center px-4 h-8 max-w-[200px] text-xs text-white bg-gradient-to-r from-[#3D67B0] to-[#4CA7DE] transition border-[1px] rounded-[4px] border-white cursor-pointer
                                        hover:border-main-color hover:from-[#e7f0f7] hover:to-[#e7f0f7] hover:text-main-color'
                            >
                                Import Staff
                            </span>
                        </div>
                    </div>
                )}




            </div>
        </div>
    );
};





// Export
export default FormCom;