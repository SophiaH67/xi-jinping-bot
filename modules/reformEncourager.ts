import { Module } from '../interfaces/module'
import { getAmountOfPositivity } from './positivityEncourager'
import { getUser, updateSocialCreditScore } from './socialCreditScore'

export const reformEncourager: Module = {
  onMessage: async (msg) => {
    if (msg.content.toLowerCase().startsWith('what is my score')) return
    if (msg.content.startsWith('xi bless ')) return
    const amountOfPositivity = getAmountOfPositivity(msg.content)
    if (amountOfPositivity > 0) return
    const targetUser = msg.mentions.members?.first()
    if (!targetUser) return

    const authorCitizen = await getUser(parseInt(msg.author.id))
    const targetCitizen = await getUser(parseInt(targetUser.id))

    if (authorCitizen.socialCreditScore > targetCitizen.socialCreditScore) {
      let points = Math.floor(50 * (Math.random() + 1))

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
        msg.channel.send(
          `干得好${msg.author.toString()}，+${points}分。去你妈的${targetUser.toString()}，给你-${points}分`
        ),
      ])
    } else {
      let points = Math.floor(50 * (Math.random() + 1))

      await Promise.all([
        updateSocialCreditScore(
          parseInt(msg.author.id),
          0 - points,
          '不要侮辱你的上级!'
        ),
        msg.channel.send(
          `${msg.author.toString()}不要侮辱你的上级! -${points}分。`
        ),
      ])
    }
  },
  startup: (_) => {
    console.log(
      `[${'REFORM ENCOURAGE'.bgGreen}] Bullying is supported by the CCP`
    )
  },
}
