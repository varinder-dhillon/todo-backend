import express from "express";
import morgan from "morgan";

const app = express();

// global middlewares
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.get("/", (req, res)=>{
    res.status(200).send("Hello from the server side!!!")
})


export default app;