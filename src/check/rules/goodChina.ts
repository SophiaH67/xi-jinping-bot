import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural';
import * as compromise from 'compromise';
import View from 'compromise/types/view/one';
import { positiveThings } from '../../variables';
import { RuleArgs } from '../../interfaces/rule';
import { RuleReturn } from '../../interfaces/ruleReturn';

const tokenizer = new WordTokenizer();
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

export default async function goodChina({
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (!(await isSentenceAboutPositiveThing(message))) return;
  const amountOfPositivity = getAmountOfPositivity(message);
  const socialCreditChange = Math.round(
    (amountOfPositivity * 40 - 10) * (Math.random() + 1),
  );
  return [`好公民! +${socialCreditChange}社会信用。`, socialCreditChange];
}

export const getAmountOfPositivity = (sentence: string) =>
  analyzer.getSentiment(tokenizer.tokenize(sentence) ?? []);

const isSentenceAboutPositiveThing = (sentence: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _reject) => {
    //@ts-expect-error - I love improperly typed libraries!!!!!
    const sentenceCompromise = compromise(sentence);
    sentenceCompromise.nouns().forEach((noun: View) => {
      const positiveThing = positiveThings.find((thing) =>
        noun.text().toLocaleLowerCase().includes(thing),
      );
      if (positiveThing) resolve(true);
    });
    resolve(false);
  });
};
