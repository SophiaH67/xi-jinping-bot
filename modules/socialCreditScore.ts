import { connect } from 'mongoose'
import 'colorts/lib/string';
import { userModel } from '../schemas/userSchema'
import assert from 'assert';

assert(process.env.MONGO_URI)
connect(process.env.MONGO_URI, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true})

export const updateSocialCreditScore = async (id: number, change: number) => {
  const citizen = await getUser(id)
  console.log(`[${'SCORE'.blue}] ${change<0?'took':'added'} ${change<0?0-change:change} ${change<0?'from':'to'} ${id}'s total. ${id}'s total is now ${citizen.socialCreditScore as number+change}`)
  await userModel.findOneAndUpdate({_id: citizen.id}, {$inc: {'socialCreditScore': change}})
}

const getUser = async (id:number) => {
  const citizen = await userModel.find({ citizenID: id })
  if (citizen[0]) return citizen[0]
  console.log(`[${'SCORE'.blue}] Added untracked user ${id}`)
  const trackedCitizen = await userModel.create({citizenID: id, socialCreditScore:1000})
  const newCitizen = await trackedCitizen.save()
  return newCitizen
}