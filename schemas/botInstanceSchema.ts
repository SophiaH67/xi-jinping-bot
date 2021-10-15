import { Schema, model } from 'mongoose'

export interface BotInstance {
  userID: string
}

const botInstanceSchema = new Schema<BotInstance>({
  userID: { type: String, required: true },
})

export const botInstanceModel = model<BotInstance>(
  'botInstance',
  botInstanceSchema
)
