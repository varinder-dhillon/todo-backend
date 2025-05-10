import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const { DATABASE, DATABASE_PASSWORD } = process.env;
        if (!DATABASE || !DATABASE_PASSWORD) throw new Error("❌ DATABASE or DATABASE_PASSWORD not defined in .env");
        const DB = DATABASE.replace("<PASSWORD>", DATABASE_PASSWORD);

        await mongoose.connect(DB).then(()=>{
            console.log(`✅ MongoDB Connected`);
        });

    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
    }
}


export default connectDB;


// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })