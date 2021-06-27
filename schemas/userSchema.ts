import { Schema, model } from 'mongoose'
import { botID } from '../variables'

export interface Citizen {
  citizenID: Number
  log: [
    {
      change: Number
      reason: string
    }
  ]
  socialCreditScore: Number
}

const citizenSchema = new Schema<Citizen>(
  {
    citizenID: { type: Number, required: true },
    log: [{ change: Number, reason: String }],
  },
  {
    toJSON: { virtuals: true },
  }
)

citizenSchema.virtual('socialCreditScore').get(function (this: Citizen) {
  if (this.citizenID === botID) return 6942069420
  let socialCreditScore = 1000
  for (let i = 0; i < this.log.length; i++) {
    const log = this.log[i]
    socialCreditScore = socialCreditScore + (log.change as number)
  }
  return socialCreditScore
})
export const userModel = model<Citizen>('user', citizenSchema)
