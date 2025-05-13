import mongoose, {Schema} from "mongoose";
import { ITask } from "../types/interface";

const taskSchema: Schema<ITask> = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Task name is required!"]
    },
    
    description: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        enum: ["work", "thinking", "tea", "exercise", "study", "clock"]
    },
    status: {
        type: String,
        enum: ["inProgress", "completed", "wontDo"]
    }
})

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;