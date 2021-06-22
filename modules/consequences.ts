import { Module } from '../interfaces/module'
import 'colorts/lib/string'
import { generatePropaganda } from './messageGenerator'
import { getUser } from './socialCreditScore'

export const consequences: Module = {
  onMessage: async (msg) => {
    const citizen = await getUser(parseInt(msg.author.id))
    if (citizen.socialCreditScore < 500 && Math.random() > 0.8)
      msg.reply('你散发着资本主义的气息')
  },
  startup: (_) => {
    console.log(`[${'CONSEQUENCES'.white}] ${generatePropaganda()}`)
  },
}
