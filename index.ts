import { Client } from '@typeit/discord'
import assert from 'assert'
import { botInstanceModel } from './schemas/botInstanceSchema'
import axios from 'axios'
import { Message } from 'discord.js'
import { connect } from 'mongoose'

assert(process.env.MONGO_URI)
connect(process.env.MONGO_URI, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const bot = new Client()
const backendBase = `http://${process.env.BACKEND_HOST || 'localhost:3000'}/`

let botIDs: string[] = []

const getTarget = async (msg: Message) => {
  const mentioned = msg.mentions.members?.first()
  if (mentioned) return mentioned.user
  if (!(msg.channel.type == 'text')) return
  try {
    const msgMappings = await msg.channel.messages.fetch({ limit: 2 })
    const previousMsg: Message | undefined = Array.from(msgMappings.values())[1]
    return previousMsg?.author
  } catch {
    return undefined
  }
}

bot.on('message', async (msg) => {
  if (!msg.client.user) return
  if (msg.author.id === msg.client.user.id) return
  if (botIDs.includes(msg.author.id)) return msg.guild?.leave()

  const target = await getTarget(msg)
  const response = await axios.post(backendBase + 'check', {
    citizenID: parseInt(msg.author.id),
    message: msg.content,
    targetCitizenID: target ? parseInt(target.id) : undefined,
    mentionedIDs: msg.mentions.members
      ? msg.mentions.members.map((member) => parseInt(member.id))
      : undefined,
  })
  const { messages } = (response.data as { messages: string[]})
  messages.forEach((message) => {
    if(!message) return
    msg.channel.send(message)
      .catch(_=>{})
    })
  
  return
})

bot.on('ready', async () => {
  setInterval(() => {
    if(bot.user)
      bot.user.setActivity({
        name: `Watching over ${bot.guilds.cache.size} servers`,
        type: 'PLAYING',
    })
  }, 30 * 1000)

  //@ts-ignore
  const userID: string = bot.user.id
  const found = await botInstanceModel.findOne({ userID: userID })
  if (!found) await (await botInstanceModel.create({ userID: userID })).save()

  const updateBotInstancesCache = async () => {
    const botInstances = await botInstanceModel.find({
      userID: { $ne: userID },
    })
    botIDs = botInstances.map((botInstance) => botInstance.userID)
  }
  updateBotInstancesCache()
  setInterval(updateBotInstancesCache, 300 * 1000)
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error)
})

const token = process.env.TOKEN
assert(token)
bot.login(token)
