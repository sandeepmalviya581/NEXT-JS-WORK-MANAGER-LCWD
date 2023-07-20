import mongoose from "mongoose"

export const connectDb = async () => {


    try {
        const { connection } = await mongoose.connect('mongodb://127.0.0.1:27017/workmanager');
        console.log('Connected to db.');
        // console.log(connection);
    } catch (error) {
        console.log('Failed to connect db.');
    }

}