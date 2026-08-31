// Imports
import mongoose from 'mongoose';
import { setServers } from 'node:dns/promises'
setServers(['1.1.1.1', '8.8.8.8'])




// Check connection
let isConnected = false;





// DB connection
export const connectToDb = async (dbName:String) => {
    mongoose.set('strictQuery', true);


    // Selected Database
    // const mongo_url = 'mongodb://localhost:27017/sms';
    const mongo_url = process.env.MONGO_ACCOUNTS_URL;


    if(!mongo_url) return console.log('MONGO_URL not found');
    if(isConnected) return console.log('Already connected to MongoDb');

    try {
        await mongoose.connect(mongo_url);
        isConnected = true;
        console.log('Connected to MongoDb');
    } catch (err) {
        console.log(err);
    }
};