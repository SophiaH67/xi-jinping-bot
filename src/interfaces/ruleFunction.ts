import { RuleArgs } from './rule'
import { ruleReturn } from './ruleReturn'

export type RuleFunction = (arg: RuleArgs) => ruleReturn
