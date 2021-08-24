# xi-jinping-bot

Enforces chinese laws in discord. [Prod version running here](https://discord.com/oauth2/authorize?client_id=856891296244695040&scope=bot&permissions=0)

## Environment variables

- MONGO_URI =
  mongodb://user:pass@host:port
- TOKEN =
  your discord token
- OWNER_IDS =
  comma seperated list of owner ID's

## Usage

The bot(like china) is always listening.

### Current modules

- firewall:
  enforces great firewall rules (blocks bannedWords from variables.ts)
- positivity:
  encourages positive behaviour (nlp to punish people for talking smack)
- socialstatus:
  listens for "what is my score?" and tells you your score (can also @ someone)
- consequences:
  Calls out people for being capatalistic
- Xi's blessing:
  Gives ability to delete data stored about your user account
- reform encourager:
  Gives people rewards for bullying someone with lower credit score
- not a backdoor:
  This project has no affiliations with the Chinese Communist Party
