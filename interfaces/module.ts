import { Client } from "@typeit/discord"
import { Message } from "discord.js";

export interface Module {
  onMessage: (Message) => void | undefined
  startup: (Client) => void
}