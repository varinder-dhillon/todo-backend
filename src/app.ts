import express from "express";
// import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import AppError from "./utils/appError";
import globalErrorHandler from "./controller/appErrorcontroller";
import sanitizeRequest from "./utils/sanitize";
import cors from "cors";

const hpp = require('hpp');

// Route Imports
import boardRouter from "./routes/boardRoutes";
import taskRouter from "./routes/taskRoutes";


const app = express();

// Allow requests from Vite frontend
app.use(cors({
  origin: "*", // or "*" for all
  credentials: true // if you're using cookies or authorization headers
}));


// global middlewares
// set security http headers
app.use(helmet());

// Development logging
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

// Limit request from same API
const limitter = rateLimit({
    max: 100,
    windowMs: 1000*60*10,
    message: "Too many requests from this IP, Please try again in 10 Minutes!"
})

app.use("/api", limitter);

// Body parser
app.use(express.json({
    limit: "10kb"
}));

// Data sanitizing against NoSQL injection
// app.use(mongoSanitize());

// Data Sanitizing against XSS
// app.use(xss());

app.use(sanitizeRequest)

// Preventing parameter pollution
app.use(hpp());

// Serving static files
// app.use(express.static(`${__dirname}/public`))

// Routes
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/tasks", taskRouter);



// Unhandled routes middleware
app.all(/.*/, (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// global error Handler
app.use(globalErrorHandler)


export default app;