'use server';
// Imports
import {connectToDb} from '@/lib/mongoose';
import Section from '@/lib/models/fees/globalMasters/defineClassDetails/Section.model';
import AcademicYear from '@/lib/models/accounts/globalMasters/defineSession/AcademicYear.model';
import { modifyAdmissionStates } from '@/lib/actions/payroll/globalMasters/admissionStates.actions';





// Is session transfered
export const isSectionsSesssionTransfered = async () => {
    try {

        // Database connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Records
        const records = await Section.find({session:activeSession?.year_name});


        // Return
        return records.length > 0 ? 0 : 1;
        
    }catch(err){
        throw new Error('Error');
    };
};





// Sections session transfer
export const sectionsSesssionTransfer = async ({next_session}:any) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Records
        await Section.updateMany({}, {session:next_session});


        // Return
        return 'Transfered';
        
    }catch(err){
        throw new Error('Error');
    };
};





// Create Section Props
interface CreateSectionProps{
    section_name:String;
    order_no:Number;
};
// Create Section
export const createSection = async ({section_name, order_no}:CreateSectionProps) => {
    try {

        // Database connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});
        if(!activeSession) return 0;


        // Checking if the section already exists
        const existinSection = await Section.findOne({section_name, session:activeSession?.year_name});
        if(existinSection){
            throw new Error('Section name already exists');
        };


        // Creating new section
        const newSection = await Section.create({session:activeSession?.year_name, section_name, order_no});
        newSection.save();


        // Update last updated at date
        await modifyAdmissionStates({property:'sections_last_updated_at'});


        // Return
        return 'Created';

    } catch (err:any) {
        console.log(`Error creating section: ${err.message}`);
    };
};





// Fetch sections
export const fetchSections = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const sections = await Section.find({session:activeSession?.year_name});
        return sections;

    } catch (err:any) {
        throw new Error(`Error fetching sections: ${err}`);
    };
};





// Fetch sections names
export const fetchSectionsNames = async () => {
    try {

        // Db connection
        connectToDb('accounts');


        // Acive session
        const activeSession = await AcademicYear.findOne({is_active:true});


        // Fetching
        const sections = await Section.find({session:activeSession?.year_name}, {section_name:1});
        return sections;

    } catch (err:any) {
        throw new Error(`Error fetching sections: ${err}`);
    };
};





// Modify Section Props
interface ModifySectionProps{
    id:String;
    section_name:String;
    order_no:Number;
};
// Modify Section
export const modifySection = async ({id, section_name, order_no}:ModifySectionProps) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Fetching active session naeme
        const activeSession = await AcademicYear.findOne({is_active:1});


        // Checking if the section already exists
        const sections = await Section.find({sessiom:activeSession?.year_name});
        const existingSection = await Section.findById(id);
        if(existingSection.section_name !== section_name && sections.map(section => section.section_name).includes(section_name)){throw new Error('Section name already exists')};


        // Updating section
        await Section.findByIdAndUpdate(id, {section_name, order_no}, {new:true});


        // Update last updated at date
        await modifyAdmissionStates({property:'sections_last_updated_at'});


        // Return
        return 'Updated';

    } catch (err) {
        throw new Error(`Error updating section: ${err}`);
    };
};





// Delete section
export const deleteSection = async ({id}:{id:String}) => {
    try {

        // Db connection
        connectToDb('accounts');


        // Deleting section
        await Section.findByIdAndDelete(id);


        // Update last updated at date
        await modifyAdmissionStates({property:'sections_last_updated_at'});


        // Return
        return 'Section Deleted';

    } catch (err) {
        throw new Error(`Error deleting section: ${err}`);      
    };
};