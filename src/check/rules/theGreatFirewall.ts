import { RuleArgs } from 'src/interfaces/rule';
import { RuleReturn } from 'src/interfaces/ruleReturn';
import { bannedWords, fakeThings, offensive } from '../../variables';

export default async function theGreatFirewall({
  message,
}: RuleArgs): Promise<RuleReturn> {
  const badWord = bannedWords.find((bad) => message.includes(bad));
  if (badWord) return [`${badWord}不存在!`, -100];

  const fakeThing = fakeThings.find((fake) => message.includes(fake));
  if (fakeThing) return [`${fakeThing}是由外国资本家猪组成的。`, -200];

  const offensiveThing = offensive.find((offense) => message.includes(offense));
  if (offensiveThing) return ['CCP不赞成你的存在。', -500];
  return;
}
