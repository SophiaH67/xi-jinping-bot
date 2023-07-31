import { RuleArgs } from '../../interfaces/rule';
import { RuleReturn } from '../../interfaces/ruleReturn';
import { getAmountOfPositivity } from './goodChina';

export default async function reformEncourager({
  citizen,
  targetCitizen,
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (!targetCitizen) return;
  if (message.toLowerCase().startsWith('what is my score')) return;
  if (message.toLowerCase().startsWith('xi bless ')) return;

  const amountOfPositivity = getAmountOfPositivity(message);
  if (amountOfPositivity >= 0) return;

  const points = Math.floor(30 * (Math.random() + 1) * amountOfPositivity * -1);
  if (!points) return;

  if (citizen.socialCreditScore > targetCitizen.socialCreditScore) {
    targetCitizen.socialCreditScore -= points;
    await targetCitizen.save();
    return [
      `干得好<@${citizen.discordID}>，+${points}分。去你妈的<@${
        targetCitizen.discordID || targetCitizen.citizenID
      }>，给你-${points}分`,
      points,
    ];
  } else {
    return [
      `<@!${citizen.discordID}>不要侮辱你的上级! -${points}分。`,
      -points,
    ];
  }
}
