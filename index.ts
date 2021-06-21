import { Client } from "@typeit/discord"
import { theGreatFirewall } from "./modules/theGreatFirewall"

const bot = new Client()

bot.on('message', (msg) => {
  theGreatFirewall.onMessage(msg)
})

bot.on('ready', () => {
  theGreatFirewall.startup(bot)
})

const token = process.env.TOKEN
bot.login(token)