import { Injectable, Logger } from '@nestjs/common';
import { Citizen, CitizenDocument } from './schemas/Citizen';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CitizenService {
  private readonly logger = new Logger(CitizenService.name);

  constructor(
    @InjectModel(Citizen.name) private citizenModel: Model<Citizen>,
  ) {}

  async getCitizen(id: string): Promise<CitizenDocument> {
    const citizen = await this.citizenModel.findOne({ discordID: id });

    if (citizen) return citizen;

    const oldCitizen = await this.citizenModel.findOne({
      citizenID: Number(id), // Old way of storing citizens rounds their ID
    });
    // If the citizen exists, update their discordID and remove their citizenID
    if (oldCitizen) {
      //@ts-expect-error - If there is a logs field, remove it
      if (oldCitizen.logs) {
        //@ts-expect-error - If there is a logs field, remove it
        oldCitizen.logs = undefined;
        oldCitizen.socialCreditScore = 1000;
      }
      oldCitizen.discordID = id;
      oldCitizen.citizenID = undefined;
      await oldCitizen.save();
      return oldCitizen;
    }

    // If the citizen doesn't exist, create them
    const newCitizen = new this.citizenModel({
      discordID: id,
      socialCreditScore: 1000,
    });

    await newCitizen.save();

    return newCitizen;
  }

  async updateSocialCreditScore(
    citizenId: string,
    change: number,
  ): Promise<void> {
    const citizen = await this.getCitizen(citizenId);

    this.logger.log(
      `${change < 0 ? 'took' : 'added'} ${change} from ${
        citizen.discordID
      }'s total.`,
    );

    // Use mongoose's update method to update the citizen's social credit score
    await this.citizenModel.updateOne(
      { discordID: citizenId },
      { $inc: { socialCreditScore: change } },
    );
  }
}
