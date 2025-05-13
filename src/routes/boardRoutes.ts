import express from "express";
import { createBoard, getBoard, updateBoard } from "../controller/boardController";

const router = express.Router();

router.post("/", createBoard);
router.route('/:id')
    .get(getBoard)
    .patch(updateBoard)


export default router;