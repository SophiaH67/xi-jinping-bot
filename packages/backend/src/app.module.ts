import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckModule } from './check/check.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CitizenModule } from './citizen/citizen.module';

@Module({
  imports: [
    CheckModule,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    MongooseModule.forRoot(process.env.MONGO_URI!),
    CitizenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
