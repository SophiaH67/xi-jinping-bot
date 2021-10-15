import { Citizen } from '../schemas/User'

export interface RuleArgs {
  previousMessage?: string
  currentMessage: string
  mentionedIDs?: string[]
  mentionedCitizens?: (Citizen & { _id: any })[]
  citizen: Citizen & { _id: any }
}
