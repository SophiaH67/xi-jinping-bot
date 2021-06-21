import { Client } from "@typeit/discord"
import { theGreatFirewall } from "./modules/theGreatFirewall"

const bot = new Client()

let modules = []

bot.on('message', (msg) => {
  theGreatFirewall.onMessage(msg)
})

bot.on('ready', () => {
  theGreatFirewall.startup(bot)
})

const token = process.env.TOKEN
bot.login(token)