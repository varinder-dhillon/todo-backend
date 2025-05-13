import { Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}