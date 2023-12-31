import { CitizenService } from 'src/citizen/citizen.service';
import { Citizen, CitizenSchema } from 'src/citizen/schemas/Citizen';
import { RuleArgs } from 'src/interfaces/rule';
import { RuleReturn } from 'src/interfaces/ruleReturn';

export default async function leaderboardRule({
  citizen,
  message,
  guild,
  citizenService,
}: RuleArgs): Promise<RuleReturn> {
  if (!message.toLowerCase().startsWith('best citizen?')) return;

  if (!guild) return ['你和我在這裡都是孤獨的！ 我是第一名！', 0];

  const citizens = await citizenService.getCitizensFromGuild(guild.id);
  const sortedCitizens = citizens.sort(
    (a, b) => b.socialCreditScore - a.socialCreditScore,
  );

  const topTenCitizens = sortedCitizens.slice(0, 10);
  const topTenCitizensString = topTenCitizens
    .map(
      (citizen, index) =>
        `${index + 1}. ${citizen.username} - ${citizen.socialCreditScore}`,
    )
    .join('\n');
  console.table(topTenCitizens);
  console.log(topTenCitizensString);
  return [`最好的公民是：\n${topTenCitizensString}`, 0];
}
