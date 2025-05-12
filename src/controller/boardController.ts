import { Request, Response, NextFunction } from "express";
import Board from "../model/boardModel";
import { status } from "../types/constants";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const createBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const { name, description } = req.body;

    const board = await Board.create({});

    if (!board) return next(new AppError("Board is not created!", status.fail));

    res.status(status.success).json({
      status: "Success",
      data: board,
    });
  }
);


export const getBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    const board = await Board.findById(id);

    if (!board) return next(new AppError("Board is not not founded!", status.fail));

    res.status(status.success).json({
        status: "Success",
        data: board
    })
})