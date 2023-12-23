import assert from 'assert'
import { botInstanceModel } from './schemas/botInstanceSchema'
import axios from 'axios'
import { Client, Message, Intents } from 'discord.js'
import { connect } from 'mongoose'

assert(process.env.MONGO_URI)
connect(process.env.MONGO_URI)

const bot = new Client({allowedMentions: { parse: ['users'] }, intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS], partials: ["CHANNEL"]})
const backendBase = `http://${process.env.BACKEND_HOST || 'localhost:3000'}/`

let botIDs: string[] = []

const getTarget = async (msg: Message) => {
  const mentioned = msg.mentions.members?.first()
  if (mentioned) return mentioned.user
  if (!(msg.channel.type == 'GUILD_TEXT')) return
  try {
    const msgMappings = await msg.channel.messages.fetch({ limit: 2 })
    const previousMsg: Message | undefined = Array.from(msgMappings.values())[1]
    return previousMsg?.author
  } catch {
    return undefined
  }
}

bot.on('messageCreate', async (msg) => {
  if (!msg.client.user) return
  if (msg.author.id === msg.client.user.id) return
  if (botIDs.includes(msg.author.id)) {msg.guild?.leave(); return}

  const target = await getTarget(msg)
  const response = await axios.post(backendBase + 'check', {
    citizenID: msg.author.id,
    message: msg.content,
    targetCitizenID: target?.id,
    mentionedIDs: msg.mentions.members?.map((member) => member.id)
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
  console.log('ready')
  setInterval(() => {
    if(bot.user)
      bot.user.setActivity({
        name: `Watching over ${bot.guilds.cache.size} servers`,
        type: 'PLAYING',
    })
    updateServerCount()
  }, 30 * 1000)

  //@ts-ignore
  const userID: string = bot.user.id
  let thisBot = await botInstanceModel.findOne({ userID: userID })
  if (!thisBot) {
    thisBot = await botInstanceModel.create({ userID: userID })
    await thisBot.save()
  }

  const updateBotInstancesCache = async () => {
    const botInstances = await botInstanceModel.find({
      userID: { $ne: userID },
    })
    botIDs = botInstances.map((botInstance) => botInstance.userID)
  }

  const updateServerCount = async () => {
    await botInstanceModel.updateOne({_id: thisBot?._id}, {serverCount: bot.guilds.cache.size})
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
