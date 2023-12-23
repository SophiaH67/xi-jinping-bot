import { RuleArgs } from 'src/interfaces/rule';
import { RuleReturn } from 'src/interfaces/ruleReturn';

export default async function notABackdoor({
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (message.toLowerCase().includes('backdoor'))
    return ['中国政府与此毫无关系。-200分！', -200];
  return;
}
