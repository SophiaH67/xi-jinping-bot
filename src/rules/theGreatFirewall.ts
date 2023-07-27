import { RuleArgs } from 'src/interfaces/rule'
import { RuleReturn } from 'src/interfaces/ruleReturn'
import { bannedWords, fakeThings, offensive } from '../variables'

export default async function theGreatFirewall({
  message,
}: RuleArgs): Promise<RuleReturn> {
  let badWord = bannedWords.find((bad) => message.includes(bad))
  if (badWord) return [`${badWord}不存在！ -100 社交点`, -100]

  let fakeThing = fakeThings.find((fake) => message.includes(fake))
  if (fakeThing) return [`${fakeThing}是外国资本家猪编出来的！ -200社会信用点！`, -200]

  let offensiveThing = offensive.find((offense) => message.includes(offense))
  if (offensiveThing) return ['CCP不赞成你的存在。-500 社交点', -500]
  return
}
