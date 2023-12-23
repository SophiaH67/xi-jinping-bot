import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { CitizenModule } from 'src/citizen/citizen.module';
import { CheckService } from './check.service';

@Module({
  imports: [CitizenModule],
  controllers: [CheckController],
  providers: [CheckService],
})
export class CheckModule {}
