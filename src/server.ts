import dotenv from "dotenv";

// global initialization
dotenv.config();

import app from "./app";
import connectDB from "./config/db";


const PORT = process.env.PORT || 8000;

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.log("Something went wrong! ->" + err);
})

