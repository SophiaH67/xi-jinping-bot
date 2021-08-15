import { MessageEmbed } from 'discord.js'
import { Module } from '../interfaces/module'
import { generatePropaganda } from './messageGenerator'
import { sendMessage } from './messageSender'
import { getUser } from './socialCreditScore'

export const socialStatus: Module = {
  onMessage: async (msg) => {
    if (!msg.content.toLowerCase().startsWith('what is my score?')) return
    const user = await getUser(
      parseInt(msg.mentions.members?.first()?.id || msg.author.id)
    )
    let logEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('社会信用评分')
    logEmbed.description = user.socialCreditScore.toString()
    sendMessage(msg.channel, `${user.socialCreditScore}`, logEmbed)
  },
  startup: () => {
    console.log(`[${'SOCIALSTATUS'.yellow}] ${generatePropaganda()}`)
  },
}
