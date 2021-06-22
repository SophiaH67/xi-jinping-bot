import { Schema, model } from "mongoose";

export interface Citizen {
  citizenID: Number
  socialCreditScore: Number
}

const citizenSchema = new Schema<Citizen>({
  citizenID: { type: Number, required: true},
  socialCreditScore: Number,
})

export const userModel = model<Citizen>("user", citizenSchema)