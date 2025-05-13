import mongoose, { Schema } from "mongoose";
import { IBoard } from "../types/interface";
import { tasks } from "../constants/contants";
import Task from "./taskModel";


const boardSchema: Schema<IBoard> = new Schema(
  {
    name: {
      type: String,
      default: "My task board",
      trim: true,
    },
    description: {
      type: String,
      default: "Tasks to keep organised",
      trim: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, 
  }
);

// Create 4 tasks by default for new board
boardSchema.post('save', async function () {
  try {
    const tasksToInsert = tasks.map((item) => ({
      ...item,
      boardId: this._id,
    }));

    await Task.insertMany(tasksToInsert);
  } catch (err) {
    console.error("Failed to create tasks after board creation:", err);
    // Optional: Emit/log error, but avoid throwing in post middleware
  }
});

// Also fetch board tasks when fetching baord
boardSchema.virtual("tasks", {
  ref: "Task",
  foreignField: "boardId",
  localField: "_id"
})

// Also delete tasks when deleting board
boardSchema.pre("findOneAndDelete",{ document: false, query: true }, async function(next){
  const boardToDelete = await this.model.findOne(this.getFilter());

  if (boardToDelete && boardToDelete._id) {
    await Task.deleteMany({ boardId: boardToDelete._id });
  }

  next();
})

const Board = mongoose.model<IBoard>("Board", boardSchema);
export default Board;