import { MessageEmbed } from 'discord.js'
import { Module } from '../interfaces/module'
import { generatePropaganda } from './messageGenerator'
import { getUser } from './socialCreditScore'

export const socialStatus: Module = {
  onMessage: async (msg) => {
    if (msg.content.startsWith('xi what is my score?')) {
      const user = await getUser(parseInt(msg.author.id))
      let logEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('社会信用评分')
      for (let i = 0; i < user.log.length; i++) {
        const log = user.log[i]
        console.log(log)
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
