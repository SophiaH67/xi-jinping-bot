import { DMChannel, MessageEmbed, NewsChannel, TextChannel } from "discord.js"

export const sendMessage = (channel: TextChannel | DMChannel | NewsChannel, msg: string, embed?: MessageEmbed) =>
  embed ? channel.send(msg, {embed: embed}).catch(_=>{}) : channel.send(msg).catch(_=>{})