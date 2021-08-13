import { Module } from '../interfaces/module'
import 'colorts/lib/string'
import { sendMessage } from './messageSender'

export const notABackdoor: Module = {
  onMessage: (msg) => {
    if (msg.content.toLowerCase().includes('backdoor'))
      sendMessage(msg.channel, '中国政府与此毫无关系')
  },
  startup: () => {
    console.log(
      `[${'NOT A BACKDOOR'.bgMagenta.blue}] Did NOT initialize a backdoor`
    )
  },
}
