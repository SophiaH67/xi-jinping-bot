import { Message } from 'discord.js';
import { Module } from '../interfaces/module';
import 'colorts/lib/string';
import { generatePropaganda } from './messageGenerator';
import { bannedWords, fakeThings, offensive } from '../variables';
import { updateSocialCreditScore } from './socialCreditScore';
import assert from 'assert';


export const theGreatFirewall: Module = {
  onMessage: (msg: Message) => {
    assert(msg.client.user?.id)
    if (msg.author.id === msg.client.user.id) return
    let badWord = bannedWords.find((bad) => msg.content.includes(bad))
    if (badWord) return censor(msg, `${badWord}不存在!`, 10)
    let fakeThing = fakeThings.find((fake) => msg.content.includes(fake))
    if (fakeThing) return censor(msg,`${fakeThing}是由外国资本家猪组成的。`, 20)
    let offensiveThing = offensive.find((offense) => msg.content.includes(offense))
    if (offensiveThing) return censor(msg, 'CCP不赞成你的存在。', 50)
  },
  startup: (_) => {
    console.log(`[${'FIREWALL'.red}] ${generatePropaganda()}`)
  }
}

const censor = async (msg: Message, reaction: string, socialCreditHit: number) => {
  console.log(`[${'FIREWALL'.red}] ${reaction}`)
  updateSocialCreditScore(parseInt(msg.author.id), 0-socialCreditHit)
  msg.channel.send(`${reaction} 你的社会信用评分下降了${socialCreditHit}分`)
  try {
    await msg.delete()
  } catch (e) {
    return msg.channel.send("我就像台湾，我没有权利")
  }
}