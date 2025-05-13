import express from "express";
import { createTask, updateTask, deleteTask } from "../controller/taskController";

const router = express.Router();

router.post("/", createTask);

router.route("/:id")
    .patch(updateTask)
    .delete(deleteTask)

export default router;