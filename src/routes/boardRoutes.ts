import express from "express";
import { createBoard, getBoard, updateBoard, deleteBoard } from "../controller/boardController";

const router = express.Router();

router.post("/", createBoard);
router.route('/:id')
    .get(getBoard)
    .patch(updateBoard)
    .delete(deleteBoard)


export default router;