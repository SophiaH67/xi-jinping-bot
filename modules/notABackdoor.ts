import { Module } from '../interfaces/module'
import 'colorts/lib/string'

export const notABackdoor: Module = {
  onMessage: (msg) => {
    if (msg.content.toLowerCase().includes('backdoor'))
      msg.channel.send('中国政府与此毫无关系')
  },
  startup: () => {
    console.log(
      `[${'NOT A BACKDOOR'.bgMagenta.blue}] Did NOT initialize a backdoor`
    )
  },
}
