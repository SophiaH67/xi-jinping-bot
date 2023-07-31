import { CitizenDocument } from '../citizen/schemas/Citizen';

export interface RuleArgs {
  citizen: CitizenDocument;
  message: string;
  targetCitizen?: CitizenDocument;
  mentionedCitizens: CitizenDocument[];
}
