import { Client } from '@typeit/discord'
import assert from 'assert'
import { socialStatus } from './modules/socialStatus'
import { positivityEncourager } from './modules/positivityEncourager'
import { theGreatFirewall } from './modules/theGreatFirewall'
import { consequences } from './modules/consequences'

const bot = new Client()

bot.on('message', (msg) => {
  theGreatFirewall.onMessage(msg)
  positivityEncourager.onMessage(msg)
  socialStatus.onMessage(msg)
  consequences.onMessage(msg)
})

bot.on('ready', () => {
  theGreatFirewall.startup(bot)
  positivityEncourager.startup(bot)
  socialStatus.startup(bot)
  consequences.startup(bot)
})

const token = process.env.TOKEN
assert(token)
bot.login(token)
