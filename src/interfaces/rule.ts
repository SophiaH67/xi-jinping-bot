import { Citizen } from '../schemas/User'

export interface RuleArgs {
  citizen: Citizen & { _id: any }
  message: string
  targetCitizen?: Citizen & { _id: any }
  mentionedCitizens: (Citizen & { _id: any })[]
}
