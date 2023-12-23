import { Body, Controller, Post } from '@nestjs/common';
import { CheckRequestDto } from './dto/check.dto';
import { CheckService } from './check.service';
import { CitizenService } from 'src/citizen/citizen.service';
import { RuleArgs } from 'src/interfaces/rule';

@Controller('check')
export class CheckController {
  constructor(
    private readonly checkService: CheckService,
    private readonly citizenService: CitizenService,
  ) {}
  @Post()
  async check(@Body() body: CheckRequestDto) {
    const citizen = await this.citizenService.getCitizen(body.citizenID);
    const targetCitizen = body.targetCitizenID
      ? await this.citizenService.getCitizen(body.targetCitizenID)
      : undefined;
    const mentionedCitizens = await Promise.all(
      body.mentionedIDs.map(
        this.citizenService.getCitizen.bind(this.citizenService),
      ),
    );

    const ruleArgs: RuleArgs = {
      citizen,
      message: body.message,
      mentionedCitizens: mentionedCitizens,
      targetCitizen: targetCitizen,
    };

    const { messages, totalSocialChange } = await this.checkService.check(
      ruleArgs,
    );

    this.citizenService.updateSocialCreditScore(
      citizen.discordID,
      totalSocialChange,
    );

    return {
      messages,
    };
  }
}
