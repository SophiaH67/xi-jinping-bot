import { Message } from "discord.js";

export const getTarget = async (msg: Message) => {
  const mentioned = msg.mentions.members?.first()
  if (mentioned) return mentioned.user
  if (!(msg.channel.type == "text")) return
  const msgMappings = await msg.channel.messages.fetch({ limit: 2 })
  const previousMsg: Message | undefined = Array.from(msgMappings.values())[1]
  return previousMsg?.author
}