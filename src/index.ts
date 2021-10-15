import express, { Request, Response } from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import path from 'path'
import { RuleFunction } from './interfaces/ruleFunction'
import { ruleReturn } from './interfaces/ruleReturn'
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
  .filter(ruleFile => /.*\.(js|ts)$/.test(ruleFile))
  .map(
    (ruleFile) => require(rulesFolder + ruleFile).default as RuleFunction
  )

app.post('/check', async (req: Request, res: Response) => {
  const { citizenID, currentMessage, previousMessage, mentionedIDs } = req.body
  if (
    !(
      typeof citizenID == 'number' &&
      typeof currentMessage == 'string' &&
      (typeof previousMessage == 'string' || typeof previousMessage == 'undefined') &&
      (typeof mentionedIDs == 'object' || typeof mentionedIDs == 'undefined')
    )
  )
    return res.status(400).end()

  const citizen = await getCitizen(citizenID)

  if (!citizen) return res.status(404).end()
  const args: RuleArgs = {
    citizen: citizen,
    currentMessage: currentMessage,
    previousMessage: previousMessage,
    mentionedCitizens: await Promise.all((mentionedIDs||[]).map(getCitizen)),
    mentionedIDs: mentionedIDs||[],
  }

  let response: ruleReturn

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    response = await rule(args)
    if (response) break
  }
  if (!response) return res.send({ message: '' })

  const [message, change] = response
  await updateSocialCreditScore(citizen, change)
  return res.send({ message: message })
})

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}`))
