import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural'
import compromise from 'compromise'
import { positiveThings } from '../variables'
import { RuleArgs } from '../interfaces/rule'
import { ruleReturn } from '../interfaces/ruleReturn'

const tokenizer = new WordTokenizer()
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')

export default async function goodChina({ currentMessage }: RuleArgs): Promise<ruleReturn> {
  if (!(await isSentenceAboutPositiveThing(currentMessage))) return
  let amountOfPositivity = getAmountOfPositivity(currentMessage)
  let socialCreditChange = Math.round((amountOfPositivity * 40 - 10) * (Math.random() + 1))
  if (amountOfPositivity > 0) {
    console.log(`[${'POSITIVITY'}] Positive message detected (${amountOfPositivity})`)
    return [`好公民! +${socialCreditChange}社会信用`, socialCreditChange]
  } else {
    console.log(`[${'POSITIVITY'}] Negative message detected (${amountOfPositivity})`)
    return [`坏公民! ${socialCreditChange}个社会信用`, amountOfPositivity]
  }
}

export const getAmountOfPositivity = (sentence: string) =>
  analyzer.getSentiment(tokenizer.tokenize(sentence))

const isSentenceAboutPositiveThing = (sentence: string) => {
  return new Promise((resolve, _reject) => {
    const sentenceCompromise = compromise(sentence)
    sentenceCompromise.nouns().forEach((noun) => {
      let positiveThing = positiveThings.find((thing) =>
        noun.text().toLocaleLowerCase().includes(thing)
      )
      if (positiveThing) resolve(true)
    })
    resolve(false)
  })
}
