import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CitizenDocument = HydratedDocument<Citizen>;

@Schema({ collection: 'users' })
export class Citizen {
  @Prop({ required: false })
  citizenID?: number;

  @Prop({ required: true })
  discordID: string;

  @Prop({ required: true })
  socialCreditScore: number;

  @Prop({ required: true, default: [] })
  guilds: string[]; // guild IDs

  @Prop({ required: true, default: 'unknown' })
  username: string;
}

export const CitizenSchema = SchemaFactory.createForClass(Citizen);
