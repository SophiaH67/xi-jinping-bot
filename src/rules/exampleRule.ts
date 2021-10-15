import { RuleArgs } from 'src/interfaces/rule'
import { RuleReturn } from 'src/interfaces/ruleReturn'

export default async function exampleRule({
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (message.includes('Example Rule!')) {
    // Sends "Yes hello!" and adds 100 social credit
    return ['Yes hello!', 100]
  }
  // returning undefined means next rule is checked
  return
}
