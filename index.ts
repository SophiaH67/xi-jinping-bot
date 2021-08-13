import { Client } from '@typeit/discord'
import assert from 'assert'
import { socialStatus } from './modules/socialStatus'
import { positivityEncourager } from './modules/positivityEncourager'
import { theGreatFirewall } from './modules/theGreatFirewall'
import { consequences } from './modules/consequences'
import { xisBlessing } from './modules/xisBlessing'
import { reformEncourager } from './modules/reformEncourager'
import { notABackdoor } from './modules/notABackdoor'
import { setBotID } from './variables'

const bot = new Client()

bot.on('message', (msg) => {
  if (!msg.client.user) return
  if (msg.author.id === msg.client.user.id) return
  theGreatFirewall.onMessage(msg)
  positivityEncourager.onMessage(msg)
  socialStatus.onMessage(msg)
  consequences.onMessage(msg)
  xisBlessing.onMessage(msg)
  reformEncourager.onMessage(msg)
  notABackdoor.onMessage(msg)
})

bot.on('ready', () => {
  setBotID(parseInt(bot.user?.id || '0'))
  theGreatFirewall.startup(bot)
  positivityEncourager.startup(bot)
  socialStatus.startup(bot)
  consequences.startup(bot)
  xisBlessing.startup(bot)
  reformEncourager.startup(bot)
  notABackdoor.startup(bot)
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

const token = process.env.TOKEN
assert(token)
bot.login(token)
