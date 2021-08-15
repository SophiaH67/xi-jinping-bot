import { Schema, model } from 'mongoose'

export interface Citizen {
  citizenID: Number
  socialCreditScore: Number
}

const citizenSchema = new Schema<Citizen>({
  citizenID: { type: Number, required: true },
  socialCreditScore: { type: Number, required: true },
})

export const userModel = model<Citizen>('user', citizenSchema)
