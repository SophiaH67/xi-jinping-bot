import { Citizen } from '../schemas/User'

export interface RuleArgs {
  previousMessage?: string
  currentMessage: string
  mentionedIDs?: string[]
  citizen: Citizen & { _id: any }
}
