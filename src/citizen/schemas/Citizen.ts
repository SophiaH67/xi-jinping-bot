import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CitizenDocument = HydratedDocument<Citizen>;

@Schema()
export class Citizen {
  @Prop({ required: false })
  citizenID?: number;

  @Prop({ required: true })
  discordID: string;

  @Prop({ required: true })
  socialCreditScore: number;
}

export const CitizenSchema = SchemaFactory.createForClass(Citizen);
