import express from "express";
import { createBoard, getBoard } from "../controller/boardController";

const router = express.Router();

router.post("/", createBoard);
router.route('/:id')
    .get(getBoard)


export default router;