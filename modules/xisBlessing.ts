import { Module } from '../interfaces/module'
import 'colorts/lib/string'
import { generatePropaganda } from './messageGenerator'
import { getUser } from './socialCreditScore'
import { sendMessage } from './messageSender'

export const xisBlessing: Module = {
  onMessage: async (msg) => {
    if (!msg.content.startsWith('xi bless ')) return
    const target = parseInt(msg.author.id)
    const citizen = await getUser(target)
    setTimeout(async () => {
      citizen.remove()
      await sendMessage(msg.channel, '伟大的霸主习近平保佑你的灵魂')
    }, 5000)
  },
  startup: () => {
    console.log(`[${"XI'S BLESSING".magenta}] ${generatePropaganda()}`)
  },
}
