import { Injectable } from '@nestjs/common';
import { RuleFunction } from '../interfaces/ruleFunction';
import { RuleArgs } from '../interfaces/rule';
import consequences from './rules/consequences';
import exampleRule from './rules/exampleRule';
import goodChina from './rules/goodChina';
import notABackdoor from './rules/notABackdoor';
import reformEncourager from './rules/reformEncourager';
import theGreatFirewall from './rules/theGreatFirewall';
import whatIsMyScore from './rules/whatIsMyScore';
import xisBlessing from './rules/xisBlessing';
import leaderboardRule from './rules/leaderboard';

@Injectable()
export class CheckService {
  private rules: RuleFunction[];

  constructor() {
    this.rules = [
      consequences,
      exampleRule,
      goodChina,
      notABackdoor,
      reformEncourager,
      theGreatFirewall,
      whatIsMyScore,
      xisBlessing,
      leaderboardRule,
    ];
  }

  async check(args: RuleArgs) {
    const responses = await Promise.all(this.rules.map((rule) => rule(args)));

    let messages: string[] = [];
    let totalSocialChange = 0;

    responses.forEach((response) => {
      if (!response) return;

      messages = messages.concat(response[0]);
      totalSocialChange += response[1];
    });

    return {
      messages,
      totalSocialChange,
    };
  }
}
