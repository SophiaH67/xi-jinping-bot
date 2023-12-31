import { GuildDto } from 'xi-jinping-types';
import { CitizenDocument } from '../citizen/schemas/Citizen';
import { CitizenService } from 'src/citizen/citizen.service';

export interface RuleArgs {
  citizen: CitizenDocument;
  message: string;
  targetCitizen?: CitizenDocument;
  mentionedCitizens: CitizenDocument[];
  guild?: GuildDto;
  citizenService: CitizenService; // I don't care about DI :)
}
