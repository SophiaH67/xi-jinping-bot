import { connect } from 'mongoose'
import 'colorts/lib/string'
import { userModel } from '../schemas/userSchema'
import assert from 'assert'

assert(process.env.MONGO_URI)
connect(process.env.MONGO_URI, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

export const updateSocialCreditScore = async (
  id: number,
  change: number,
  _reason: string
) => {
  const citizen = await getUser(id)
  console.log(
    `[${'SCORE'.blue}] ${change < 0 ? 'took' : 'added'} ${
      change < 0 ? 0 - change : change
    } ${change < 0 ? 'from' : 'to'} ${id}'s total. ${id}'s total is now ${
      (citizen.socialCreditScore as number) + change
    }`
  )
  await userModel.findOneAndUpdate(
    { _id: citizen.id },
    {
      $inc: { socialCreditScore: change },
    }
  )
}

export const getUser = async (id: number) => {
  const citizen = await userModel.find({ citizenID: id })
  if (citizen[0]) {
    //@ts-ignore
    const log: { change: number }[] | undefined = JSON.parse(
      JSON.stringify(citizen[0])
    ).log
    if (log) {
      // Migrate user
      //@ts-ignore
      const socialCreditScore: number = log.reduce(
        //@ts-ignore
        (acc, logItem) => acc.change || acc + logItem.change,
        1000
      )
      console.log(`socialCreditScore: ${socialCreditScore}`)
      const migratedCitizen = await userModel.create({
        citizenID: id,
        socialCreditScore: socialCreditScore,
      })
      await citizen[0].delete()
      return migratedCitizen
    }
    return citizen[0]
  }
  console.log(`[${'SCORE'.blue}] Added untracked user ${id}`)
  const trackedCitizen = await userModel.create({
    citizenID: id,
    socialCreditScore: 1000,
  })
  const newCitizen = await trackedCitizen.save()
  return newCitizen
}
