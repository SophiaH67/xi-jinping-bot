import { MessageEmbed } from 'discord.js'
import { Module } from '../interfaces/module'
import { generatePropaganda } from './messageGenerator'
import { getUser } from './socialCreditScore'

export const socialStatus: Module = {
  onMessage: async (msg) => {
    if (msg.content.toLowerCase().startsWith('what is my score?')) {
      const user = await getUser(
        parseInt(msg.mentions.members?.first()?.id || msg.author.id)
      )
      let logEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('社会信用评分')
      const logs = user.log.slice(-10)
      for (let i = 0; i < logs.length; i++) {
        const log = logs[i]
        logEmbed.addField(
          `${log.change > 0 ? '+' : ''}${log.change}`,
          `${log.reason}`
        )
      }
      msg.channel.send(`${user.socialCreditScore}`, { embed: logEmbed })
    }
  },
  startup: () => {
    console.log(`[${'SOCIALSTATUS'.yellow}] ${generatePropaganda()}`)
  },
}
