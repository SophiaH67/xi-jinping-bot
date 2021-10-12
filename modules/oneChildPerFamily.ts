import { Module } from "../interfaces/module";
import { botInstanceModel } from "../schemas/botInstanceSchema";

let botIDs: string[] = []

export const oneChildPerFamily: Module = {
  onMessage: (msg) => {
    if (botIDs.includes(msg.author.id)) {
      msg.guild?.leave()
    }
  },
  startup: async (bot) => {
    //@ts-ignore
    const userID: string = bot.user.id
    const found = await botInstanceModel.find({userID: userID})
    if (found.length === 0) await (await botInstanceModel.create({userID: userID})).save()

    const updateBotInstancesCache = async () => {
      const botInstances = await botInstanceModel.find({userID: { $ne: userID }})
      botIDs = botInstances.map((botInstance) => botInstance.userID)
    }
    updateBotInstancesCache()
    setInterval(updateBotInstancesCache, 300 * 1000)
  }
}