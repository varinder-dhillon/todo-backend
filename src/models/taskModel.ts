import mongoose, {Schema} from "mongoose";
import { ITask } from "../types/interface";

const taskSchema: Schema<ITask> = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Task name is required."]
    },
    
    description: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        enum: ["work", "thinking", "tea", "exercise", "study", "clock"],
        required: [true, "Task should have icon."]
    },
    status: {
        type: String,
        enum: ["inProgress", "completed", "wontDo"],
        required: [true, "Task should have status."]
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: [true, "Task must belong to a user."]
    }
}, {timestamps: true})

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;