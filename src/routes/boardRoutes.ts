import express from "express";
import AppError from "../utils/appError";
import { createBoard } from "../controller/boardController";

const router = express.Router();

router.post("/", createBoard)


export default router;