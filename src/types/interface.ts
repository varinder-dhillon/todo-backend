import { Document } from "mongoose";

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
  boardId: string;
  createdAt?: Date;
  updatedAt?: Date;
}