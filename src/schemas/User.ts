import { Schema, model, Document } from 'mongoose'

export interface Citizen extends Document {
  citizenID: Number
  socialCreditScore: Number
  discordID: string
}

const CitizenSchema = new Schema({
  citizenID: { type: Number, required: true },
  discordID: { type: String, required: false },
  socialCreditScore: { type: Number, required: true },
})

export const CitizenModel = model<Citizen>('user', CitizenSchema)
