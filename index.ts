import { Client } from "@typeit/discord"
import assert from "assert"
import { theGreatFirewall } from "./modules/theGreatFirewall"

const bot = new Client()

bot.on('message', (msg) => {
  theGreatFirewall.onMessage(msg)
})

bot.on('ready', () => {
  theGreatFirewall.startup(bot)
})

const token = process.env.TOKEN
assert(token)
bot.login(token)