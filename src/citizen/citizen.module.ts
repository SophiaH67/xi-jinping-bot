import { Module } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Citizen, CitizenSchema } from './schemas/Citizen';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Citizen.name, schema: CitizenSchema }]),
  ],
  providers: [CitizenService],
  exports: [CitizenService],
})
export class CitizenModule {}
