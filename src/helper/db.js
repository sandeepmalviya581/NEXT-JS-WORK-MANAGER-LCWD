import mongoose from "mongoose"

export const connectDb = async () => {


    try {
        // const { connection } = await mongoose.connect('mongodb://127.0.0.1:27017/workmanager');

        // const { connection } = await mongoose.connect(process.env.MONGO_DB_URL);

        const { connection } = await mongoose.connect('mongodb+srv://sandeepmalviya581:omshanti@cluster0.zaacxo1.mongodb.net',{
            dbName:'workmanager'
        });
        console.log('Connected to db.');
        console.log(connection.db.host);
    } catch (error) {
        console.log('Failed to connect db.');
    }

}