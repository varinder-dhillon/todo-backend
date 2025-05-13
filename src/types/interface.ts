import { Document, Types } from "mongoose";

export interface IBoard extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITask extends Document {
  name: string;
  description: string;
  icon: string;
  status: string;
  boardId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Task {
  name: string;
  description: string;
  icon: string;
  status: string;
} 