import { RuleArgs } from 'src/interfaces/rule'
import { ruleReturn } from 'src/interfaces/ruleReturn'

export default async function exampleRule({ message }: RuleArgs): Promise<ruleReturn> {
  if (message.includes('Example Rule!')) {
    // Sends "Yes hello!" and adds 100 social credit
    return ['Yes hello!', 100]
  }
  // returning undefined means next rule is checked
  return
}
