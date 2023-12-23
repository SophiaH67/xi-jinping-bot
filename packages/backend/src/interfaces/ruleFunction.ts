import { RuleArgs } from './rule';
import { RuleReturn } from './ruleReturn';

export type RuleFunction = (arg: RuleArgs) => Promise<RuleReturn> | RuleReturn;
