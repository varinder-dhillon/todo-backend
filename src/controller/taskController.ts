import Task from "../models/taskModel";
import { status } from "../types/constants";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const createTask = catchAsync(async (req, res, next) => {
    const task = await Task.create(req.body);
    if(!task) return next(new AppError("Task is not created.", status.notFound));

    res.status(status.success).json({
        status: "Success",
        data: task
    })
})

export const updateTask = catchAsync(async (req, res, next)=>{
    const {id} = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {new: true});

    if(!task) return next(new AppError("Task not updated.", status.fail));

    res.status(status.success).json({
        status: "Success",
        data: task
    })
})

export const deleteTask = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if(!task) return next(new AppError("Task not found", status.notFound));

    res.status(status.success).json({
        status: "Success",
    })
})