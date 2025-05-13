import { Request, Response, NextFunction } from "express";
import Board from "../models/boardModel";
import { status } from "../types/constants";
import { IBoard } from "../types/interface";
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const createBoard = catchAsync(
  async (req, res, next) => {
    // const { name, description } = req.body;

    const board = await Board.create({});

    if (!board) return next(new AppError("Board is not created!", status.fail));

    res.status(status.success).json({
      status: "Success",
      data: board,
    });
  }
);


export const getBoard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    
    const board = await Board.findById(id).populate("tasks");

    if (!board) return next(new AppError("Board is not not founded!", status.fail));

    res.status(status.success).json({
        status: "Success",
        data: board
    })
})

export const updateBoard = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const {name, description } = req.body
    const body:{
      name: string,
      description: string
    } = {
      name: "",
      description: ""
    };

    if(name) body.name = name;
    if(description) body.description = description;

    const board = await Board.findByIdAndUpdate(id, body, {new: true});

    if (!board) return next(new AppError("Board is not not founded!", status.fail));


    res.status(status.success).json({
        status: "Success",
        data: board
    })
})

export const deleteBoard = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const board = await Board.findByIdAndDelete(id);

  if(!board) return next(new AppError("Board is not found with the id.", status.notFound))

  res.status(status.noContent).json({
    status: "Success",
    data: board
  })
})