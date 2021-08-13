import { Module } from '../interfaces/module'
import { sendMessage } from './messageSender'
import { getAmountOfPositivity } from './positivityEncourager'
import { getUser, updateSocialCreditScore } from './socialCreditScore'
import { getTarget } from './targetFinder'

export const reformEncourager: Module = {
  onMessage: async (msg) => {
    if (msg.content.toLowerCase().startsWith('what is my score')) return
    if (msg.content.startsWith('xi bless ')) return
    const amountOfPositivity = getAmountOfPositivity(msg.content)
    if (amountOfPositivity >= 0) return
    const targetUser = await getTarget(msg)
    if (!targetUser) return

    if (msg.author.id === targetUser.id) return

    const authorCitizen = await getUser(parseInt(msg.author.id))
    const targetCitizen = await getUser(parseInt(targetUser.id))

    let points = Math.floor(30 * (Math.random() + 1) * amountOfPositivity * -1)
    console.log(`[${'REFORM ENCOURAGER'.bgGreen}] Message ${msg.id} has points ${points}`)
    if (!points) return
    if (authorCitizen.socialCreditScore > targetCitizen.socialCreditScore) {
      await Promise.all([
        updateSocialCreditScore(
          parseInt(msg.author.id),
          points,
          '侮辱性的坏人'
        ),
        updateSocialCreditScore(
          parseInt(targetUser.id),
          0 - points,
          '受辱于上级'
        ),
        sendMessage(
          msg.channel, 
          `干得好${msg.author.toString()}，+${points}分。去你妈的${targetUser.toString()}，给你-${points}分`
        ),
      ])
    } else {
      await Promise.all([
        updateSocialCreditScore(
          parseInt(msg.author.id),
          0 - points,
          '不要侮辱你的上级!'
        ),
        sendMessage(
          msg.channel, 
          `${msg.author.toString()}不要侮辱你的上级! -${points}分。`
        ),
      ])
    }
  },
  startup: (_) => {
    console.log(
      `[${'REFORM ENCOURAGER'.bgGreen}] Bullying is supported by the CCP`
    )
  },
}
