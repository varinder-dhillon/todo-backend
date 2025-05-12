import express from "express";
import AppError from "../utils/appError";

const router = express.Router();

router.get("/", (req, res, next)=> {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    res.status(200).json({
        status: "Success",
    })
})


export default router;