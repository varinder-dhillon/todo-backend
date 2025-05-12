import dotenv from "dotenv";

// global initialization
dotenv.config();

import connectDB from "./config/db";
import app from "./app";


const PORT = process.env.PORT || 8000;

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.log("Something went wrong! ->" + err);
})

