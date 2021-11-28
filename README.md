# xi-jinping-bot

Enforces chinese laws in discord. [Prod version running here](https://discord.com/oauth2/authorize?client_id=856891296244695040&scope=bot&permissions=0)

## Running / setup

### Generic

To run your own instance of the bot, download the docker-compose.yml
included in the repo. Edit the values(you should only touch TOKEN
unless you know what you're doing) and run ``docker-compose up -d``.

Xi jinping should now be running!

### Ubuntu setup

Install docker+docker-compose with
```bash
sudo apt update -y
sudo apt install -y docker.io
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Now that you have docker-compose installed, you can run the following to download the docker-compose file

```bash
wget https://raw.githubusercontent.com/marnixah/xi-jinping-bot/master/docker-compose.yml
```

Edit the value for ``TOKEN`` in docker-compose.yml and then run ``docker-compose up -d``

Xi jinping should now be running!

## Usage

The bot(like china) is always listening.

Current commands are 
- ``What is my score?`` with an optional mention
of a user(e.g. ``What is my score? @timmy``).
- ``Xi bless`` which resets your own score

### Current modules

These modules are all loaded in the backend

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
