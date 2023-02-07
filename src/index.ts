import express, { Request, Response } from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import path from 'path'
import { RuleFunction } from './interfaces/ruleFunction'
import { RuleArgs } from './interfaces/rule'
import mongoose from 'mongoose'
import assert from 'assert'
import { getCitizen, updateSocialCreditScore } from './lib/citizens'

assert(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
const port = parseInt(process.env.PORT || '3000')

const app = express()

app.use(cors())
app.use(express.json())

const rulesFolder = path.join(__dirname, '/rules/')
let rules = readdirSync(rulesFolder)
  .filter((ruleFile) => /.*\.(js|ts)$/.test(ruleFile))
  .map((ruleFile) => require(rulesFolder + ruleFile).default as RuleFunction)

app.post('/check', async (req: Request, res: Response) => {
  const { citizenID, message, targetCitizenID, mentionedIDs } =
    req.body
  if (
    !(
      typeof citizenID == 'string' &&
      typeof message == 'string' &&
      (typeof targetCitizenID == 'string' ||
        typeof targetCitizenID == 'undefined') &&
      (typeof mentionedIDs == 'object' || typeof mentionedIDs == 'undefined')
    )
  )
    return res.status(400).end()

  const citizen = await getCitizen(citizenID, citizenID)

  if (!citizen) return res.status(404).end()
  const args: RuleArgs = {
    citizen: citizen,
    message: message,
    targetCitizen: targetCitizenID
      ? await getCitizen(targetCitizenID)
      : undefined,
    mentionedCitizens: mentionedIDs
      ? await Promise.all(mentionedIDs.map(getCitizen))
      : [],
  }

  const responses = await Promise.all(rules.map((rule) => rule(args)))

  let messages: string[] = []
  let totalSocialChange = 0

  responses
    .filter((response) => response)
    .forEach((response) => {
      totalSocialChange = totalSocialChange + response![1]
      messages.push(response![0])
    })

  await updateSocialCreditScore(citizen, totalSocialChange)
  return res.send({ messages: messages })
})

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}`))
