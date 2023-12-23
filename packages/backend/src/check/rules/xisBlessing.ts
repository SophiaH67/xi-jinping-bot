import { RuleArgs } from 'src/interfaces/rule';
import { RuleReturn } from 'src/interfaces/ruleReturn';

export default async function xisBlessing({
  citizen,
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (!message.toLowerCase().startsWith('xi bless')) return;
  return ['伟大的霸主习近平保佑你的灵魂', -citizen.socialCreditScore];
}
