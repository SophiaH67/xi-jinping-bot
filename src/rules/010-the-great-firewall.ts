import { RuleArgs } from 'src/interfaces/rule'
import { ruleReturn } from 'src/interfaces/ruleReturn'
import { bannedWords, fakeThings, offensive } from '../variables'

export default async function theGreatFirewall({ currentMessage }: RuleArgs): Promise<ruleReturn> {
  let badWord = bannedWords.find((bad) => currentMessage.includes(bad))
  if (badWord) return [`${badWord}不存在!`, -100]

  let fakeThing = fakeThings.find((fake) => currentMessage.includes(fake))
  if (fakeThing) return [`${fakeThing}是由外国资本家猪组成的。`, -200]

  let offensiveThing = offensive.find((offense) => currentMessage.includes(offense))
  if (offensiveThing) return ['CCP不赞成你的存在。', -500]
  return
}