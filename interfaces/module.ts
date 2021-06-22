import { Client } from '@typeit/discord'
import { Message } from 'discord.js'

export interface Module {
  onMessage: (msg: Message) => any
  startup: (bot: Client) => any
}
