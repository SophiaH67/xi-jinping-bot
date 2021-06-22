import { bannedWords } from '../variables'

export const generatePropaganda = () =>
  doesNotExist(`${bannedWords[Math.floor(Math.random() * bannedWords.length)]}`)

export const doesNotExist = (word: string) => `${word}并不存在!`
