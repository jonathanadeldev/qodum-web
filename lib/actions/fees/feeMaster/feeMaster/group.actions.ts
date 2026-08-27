'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Group from '@/lib/models/fees/feeMaster/defineFeeMaster/FeeGroup.model';
import AdmittedStudent from '@/lib/models/admission/admission/AdmittedStudent.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import Class from '@/lib/models/fees/globalMasters/defineClassDetails/Class.model';





// Total number generator
const totalNumberGenerator = (array:any) => {
    let sum = 0;
    for (let i = 0; i < array?.length; i++ ) {sum += array[i];};
    return sum;
};


// Is session transfered
export const isGroupsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await Group.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Group session transfer
export const groupsSesssionTransfer = async ({next_session}:any) => {
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





// Create Group Props
interface CreateGroupProps{
    name:String;
    is_special:Boolean;
};
// Create Group Year
export const createGroup = async ({name, is_special}:CreateGroupProps) => {
    try {
    
        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the group name already exists
        const existingGroup = await Group.findOne({name, session:activeSession?.year_name});
        if(existingGroup){
            throw new Error('Head Group name already exists');
        };


        // Creating new group
        const newGroup = await Group.create({
            session:activeSession?.year_name,
            name:name?.trim(),
            is_special
        });
        newGroup.save();


        // Return
        return 'Created';
        
    } catch (err:any) {
        throw new Error(`Error Creating Group: ${err.message}`);
    }
};





// Fetch Groups
export const fetchGroups = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching Groups
        const groups = await Group.find({session:activeSession?.year_name});
        return groups;

    } catch (err:any) {
        throw new Error(`Error fetching groups: ${err}`);
    }
};





// Modify Group Props
interface ModifyGroupProps{
    id:String;
    name:String;
    is_special:Boolean;
}
// Modify group with id
export const modifyGroup = async ({id, name, is_special}:ModifyGroupProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the group name already exists
        const groups = await Group.find({session:activeSession?.year_name});
        const existingGroup = await Group.findById(id);
        if(existingGroup.name !== name && groups.map(i => i.name).includes(name)){throw new Error('Group name already exists')};


        // Update group
        await Group.findByIdAndUpdate(
            id,
            {
                name,
                is_special
            },
            {new:true}
        );


        // Return 
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating groups: ${err}`);
    }
};





// Delete group
export const deleteGroup = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting group
        await Group.findByIdAndDelete(id);
        return 'Group Deleted';

    } catch (err) {
        throw new Error(`Error deleting group: ${err}`);      
    }
};





// Fee group to fee head props
interface AssignFeeGroupToFeeHeadProps{
    group_name:String;
    affiliated_heads:{
        type_name:String;
        head_name:String;
        schedule_type:String;
        installment:String;
        account:String;
        post_account:String;
        fee_type:String;
    }[]
};
// Fee group to fee head
export const assignFeeGroupToFeeHead = async ({group_name, affiliated_heads}:AssignFeeGroupToFeeHeadProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Assigning
        await Group.findOneAndUpdate(
            {name:group_name, session:activeSession?.year_name},
            {affiliated_heads},
            {new:true}
        );
        

    } catch (err) {
        throw new Error(`Error assigning fee group to fee head: ${err}`);      
    }
};





// Fetch group by name
export const fetchGroupByName = async ({name}:{name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching group
        const group = await Group.findOne({name, session:activeSession?.year_name});
        const groupRes = {
            ...group._doc,
            _id:JSON.stringify(group._doc._id)
        };
        return groupRes;

    } catch (err) {
        throw new Error(`Error fetching group: ${err}`);      
    }
};





// Assign amount group
export const assignAmountGroup = async ({group_name, affiliated_heads}:any) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Selected installment in group
        const group = await Group.findOne({name:group_name, session:activeSession?.year_name});


        // Affected heads
        const affectedHeads = group.affiliated_heads.filter((head:any) => affiliated_heads.map((h:any) => h.head_name).includes(head.head_name));


        // Unaffected heads
        const unAffectedHeads = group.affiliated_heads.filter((head:any) => !affiliated_heads.map((h:any) => h.head_name).includes(head.head_name));


        // New heads
        const newHeads = unAffectedHeads.concat(affiliated_heads);
    

        // Assigning to group
        await Group.findOneAndUpdate(
            {name:group_name, session:activeSession?.year_name},
            {affiliated_heads:newHeads},
            {new:true}
        );


        // Assigning to students
        // @ts-ignore
        const groupNameRegex = new RegExp(group_name, 'i');
        await AdmittedStudent.updateMany({'affiliated_heads.group_name':groupNameRegex, session:activeSession?.year_name}, {'affiliated_heads.heads':newHeads});
        
            
    } catch (err) {
        throw new Error(`Error assigning fee group amount: ${err}`);      
    }
};





// Fetch group heads using installment props
interface FetchGroupHeadWithInstallmentValidation{
    group_name:String;
    installment:String;
};
// Fetch group heads using installment
export const fetchGroupHeadWithInstallment = async ({group_name, installment}:FetchGroupHeadWithInstallmentValidation) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Selected installment in group
        const group = await Group.findOne({name:group_name, session:activeSession?.year_name});
        const selectedHeads = group.affiliated_heads.filter((head:any) => head.installment === installment && head.fee_type === 'regular' || head.installment === 'All installments' && head.fee_type === 'regular');


        // Return
        return selectedHeads;

    } catch (err) {
        throw new Error(`Error fetching group: ${err}`);
    }
};





// Fetch regular group heads by name
export const fetchRegularGroupHeadsByName = async ({name}:{name:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching
        const group = await Group.findOne({name:name, session:activeSession?.year_name});
        const selectedHeads = group.affiliated_heads.filter((head:any) => head.fee_type === 'regular');


        // Return
        return selectedHeads;

    } catch (err) {
        throw new Error(`Error fetching group heads: ${err}`);      
    }
};





// Fetch groups by type
export const fetchGroupsByTypes = async ({is_special}:{is_special:Boolean}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Fetching special groups
        const specialGroups = await Group.find({is_special:true, session:activeSession?.year_name});


        // Fetching unspecial groups
        const unSpecialGroups = await Group.find({is_special:false, session:activeSession?.year_name});


        if(is_special){
            return specialGroups;
        }else{
            return unSpecialGroups;
        }

    
    } catch (err:any) {
        throw new Error(`Error fetching groups: ${err}`);
    }
};





// Assign multiple groups to students props
interface assignMultipleGroupsToStudentsProps{
    group_name:String;
    installment:String;
    students:any;
    group_type:String;
};
// Assign multiple groups to students
export const assignMultipleGroupsToStudents = async ({group_name, installment, students, group_type}:assignMultipleGroupsToStudentsProps) => {
    try {

        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Updating existing group students fee heads
        const group = await Group.findOne({name:group_name, session:activeSession?.year_name});
        if(group_type === 'Classes'){
            students?.filter((s:any) => s?.affiliated_heads?.group_name?.includes(group_name)).map(async (s:any) => {
                const theClass = await Class.findOne({class_name:s?.student?.class});
                await AdmittedStudent.findOneAndUpdate({'student.name':s?.student?.name}, {'affiliated_heads.heads':theClass?.affiliated_special_heads?.heads.concat(group.affiliated_heads.filter((head:any) => head.fee_type === 'regular')).sort((a:any, b:any) => a.priority_no - b.priority_no)});
            });
        }else{
            students?.filter((s:any) => s?.affiliated_heads?.group_name?.includes(group_name)).map(async (s:any) => {
                const theClass = await Class.findOne({class_name:s?.student?.class});
                await AdmittedStudent.findOneAndUpdate({'student.name':s?.student?.name}, {'affiliated_heads.heads':theClass?.affiliated_heads?.heads.concat(group.affiliated_heads.filter((head:any) => head.fee_type === 'regular')).sort((a:any, b:any) => a.priority_no - b.priority_no)});
            });
        };


        const filteredStudents =
            group_type === 'Classes'
                ? students.filter((s:any) => !s?.affiliated_heads?.group_name || s?.affiliated_heads?.group_name?.split(' (')[0]?.replace(/\)$/, '') !== group_name)
                : students.filter((s:any) => {
                    const groups = s?.affiliated_heads?.group_name?.split(' (').map((i:any) => i.replace(/\)$/, ''));
                    return !groups?.includes(group_name);
                });


        if(installment === 'All installments'){
            // Fetching
            const selectedHeads = group.affiliated_heads.filter((head:any) => head.fee_type === 'regular');
            filteredStudents.map(async (s:any) => {
                try {
                    const student = await AdmittedStudent.findOne({'student.adm_no':s.student.adm_no, session:activeSession?.year_name});
                    if(!student.affiliated_heads.group_name){
                        await AdmittedStudent.updateMany({'student.adm_no':s.student.adm_no, session:activeSession?.year_name}, {affiliated_heads:{group_name:group_type === 'Classes' ? group_name : `(${group_name})`, heads:selectedHeads}});
                    }else{
                        selectedHeads.map(async (h:any) => {
                            await AdmittedStudent.updateMany({'student.adm_no':s.student.adm_no, session:activeSession?.year_name}, {'affiliated_heads.group_name':group_type === 'Classes' ? `${group_name} ${student.affiliated_heads.group_name}` : `${student.affiliated_heads.group_name} (${group_name})`,  $push:{'affiliated_heads.heads':h}});
                        });
                    }
                } catch (err:any) {
                    console.log(err);
                }
            });
        }else{
            const selectedHeads = group.affiliated_heads.filter((head:any) => head.installment === installment && head.fee_type === 'regular' || head.installment === 'All installments' && head.fee_type === 'regular');
            filteredStudents.map(async (s:any) => {
                try {
                    const student = await AdmittedStudent.findOne({'student.adm_no':s.student.adm_no, session:activeSession?.year_name});
                    if(!student.affiliated_heads.group_name){
                        await AdmittedStudent.updateMany({'student.adm_no':s.student.adm_no, session:activeSession?.year_name}, {affiliated_heads:{group_name:group_type === 'Classes' ? group_name : `(${group_name})`, heads:selectedHeads}});
                    }else{
                        selectedHeads.map(async (h:any) => {
                            await AdmittedStudent.updateMany({'student.adm_no':s.student.adm_no, session:activeSession?.year_name}, {'affiliated_heads.group_name':group_type === 'Classes' ? `${group_name} ${student.affiliated_heads.group_name}` : `${student.affiliated_heads.group_name} (${group_name})`,  $push:{'affiliated_heads.heads':h}});
                        });
                    }
                } catch (err:any) {
                    console.log(err);
                }
            });
        };

    } catch (err) {
        throw new Error(`Error assigning groups: ${err}`);
    }
};





// Is group has payments
export const isGroupHasPayments = async ({group_name}) => {
    try {
        
        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Group name reg ex
        // @ts-ignore
        const groupNameRegex = new RegExp(group_name, 'i');

    
        // Checking
        const students = await AdmittedStudent.find({'affiliated_heads.group_name':{$regex:groupNameRegex}, session:activeSession?.year_name});
        if(students.length > 0){
            const studentsPaidFees = totalNumberGenerator(students?.map((s:any) => totalNumberGenerator(s?.affiliated_heads?.heads?.map((h:any) => totalNumberGenerator(h?.amounts?.map((a:any) => Number(a?.last_rec_amount || 0)))))));
            return studentsPaidFees > 0;
        };
        return false;

    } catch (err) {
        throw new Error(`Error checking group payments: ${err}`);
    }
};