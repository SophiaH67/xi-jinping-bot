import { DMChannel, MessageEmbed, NewsChannel, TextChannel } from "discord.js"

export const sendMessage = (channel: TextChannel | DMChannel | NewsChannel, msg: string | MessageEmbed) =>
  channel.send(msg).catch(_=>{})