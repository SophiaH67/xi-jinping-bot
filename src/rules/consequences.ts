import { RuleArgs } from 'src/interfaces/rule'
import { RuleReturn } from 'src/interfaces/ruleReturn'

export default async function consequences({
  citizen,
}: RuleArgs): Promise<RuleReturn> {
  if (citizen.socialCreditScore < 500 && Math.random() > 0.8)
    return ['你散发着资本主义的气息', 0]
  return
}