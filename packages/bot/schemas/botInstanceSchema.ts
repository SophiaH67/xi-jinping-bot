import { Schema, model } from 'mongoose'

export interface BotInstance {
  userID: string
  serverCount: number
}

const botInstanceSchema = new Schema<BotInstance>({
  userID: { type: String, required: true },
  serverCount: { type: Number }
})

export const botInstanceModel = model<BotInstance>(
  'botInstance',
  botInstanceSchema
)
