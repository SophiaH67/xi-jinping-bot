import { Module } from '../interfaces/module'
import 'colorts/lib/string'
import { generatePropaganda } from './messageGenerator'
import { owners } from '../variables'
import { getUser, updateSocialCreditScore } from './socialCreditScore'
import { sendMessage } from './messageSender'

export const xisBlessing: Module = {
  onMessage: async (msg) => {
    if (!owners.includes(msg.author.id)) return
    if (!msg.content.startsWith('xi bless ')) return
    const target = parseInt(msg.mentions.members?.first()?.id || msg.author.id)
    const citizen = await getUser(target)
    await updateSocialCreditScore(
      target,
      0 - (citizen.socialCreditScore as number) + 1000,
      '伟大的霸主习近平保佑你的灵魂'
    )
    sendMessage(msg.channel, '伟大的霸主习近平保佑你的灵魂')
  },
  startup: () => {
    console.log(
      `[${"XI'S BLESSING".magenta}] ${
        owners.length == 0
          ? 'OWNER_IDS is not set, module will not work'
          : generatePropaganda()
      }`
    )
  },
}
