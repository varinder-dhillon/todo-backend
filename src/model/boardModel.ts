import mongoose, { Schema, Document } from "mongoose";
import { IBoard } from "../types/interface";


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
  { timestamps: true }
);

const Board = mongoose.model<IBoard>("Board", boardSchema);
export default Board;