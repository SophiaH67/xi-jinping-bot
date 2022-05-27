import { SentimentAnalyzer, PorterStemmer, WordTokenizer } from 'natural'
import compromise from 'compromise'
import { positiveThings } from '../variables'
import { RuleArgs } from '../interfaces/rule'
import { RuleReturn } from '../interfaces/ruleReturn'
import OpenAI from 'openai-api'

const tokenizer = new WordTokenizer()
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')

const openai = new OpenAI(process.env.OPENAI_API_KEY || '')

export default async function goodChina({
  message,
}: RuleArgs): Promise<RuleReturn> {
  if (!(await isSentenceAboutPositiveThing(message))) return
  let amountOfPositivity = getAmountOfPositivity(message)
  let socialCreditChange = Math.round(
    (amountOfPositivity * 40 - 10) * (Math.random() + 1)
  )
  return await rewriteMessage(message, socialCreditChange)
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

async function rewriteMessage(
  message: string,
  socialCreditChange: number
): Promise<RuleReturn> {
  let baseMessage = ''

  if (socialCreditChange > 0) {
    baseMessage += `好公民! +${socialCreditChange}社会信用。`
  } else {
    baseMessage += `坏公民! ${socialCreditChange}个社会信用。`
    console.log('[goodChina] Asking AI for advice...')
    const response = await openai.complete({
      engine: 'davinci',
      prompt: `
Rewrite the following sentence to be positive about China:
Original: ${message}
Positive about China:`.trim(),
      maxTokens: 120,
      temperature: 0.9,
      stop: ['\n'],
    })

    if (response?.data?.choices[0]?.text?.trim?.()) {
      baseMessage += `我想你是想说${response.data.choices[0].text.trim()}`
    }
  }

  return [baseMessage, socialCreditChange]
}
