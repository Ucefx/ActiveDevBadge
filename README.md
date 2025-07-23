# Discord Bots for Replit

Two Discord bots that work together: Bot 1 responds to slash commands, and Bot 2 automatically calls Bot 1 every 20 days.

## Features

### Bot 1 (Main Bot)
- 🤖 Interactive token input
- 🔗 Automatic invite link generation
- ⚡ Responds to "/hello" slash command with active developer link
- ⚡ Runs perfectly on Replit

### Bot 2 (Auto-caller Bot)
- 🤖 Interactive token input for second bot
- 🔗 Automatic invite link generation
- 📅 Automatically calls Bot 1 every 20 days
- ⏰ Scheduled using cron jobs

## Setup Instructions

### Step 1: Create a Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create TWO applications (one for each bot)
3. Go to the "Bot" section
4. Click "Add Bot"
5. Copy both bot tokens (keep them secret!)

### Step 2: Run Bot 1 on Replit
1. Run Bot 1 with `npm start`
2. Enter your first bot token when prompted
3. Copy the generated invite link
4. Use the invite link to add Bot 1 to your server

### Step 3: Run Bot 2 on Replit
1. Run Bot 2 with `node bot2.js`
2. Enter your second bot token when prompted
3. Enter the Guild ID where Bot 1 is located
4. Enter the Channel ID where Bot 1 should be called
5. Copy the generated invite link for Bot 2
6. Use the invite link to add Bot 2 to your server

## Usage

### Bot 1
- Use `/hello` slash command in any channel where Bot 1 has access
- Bot 1 will reply with the Discord Active Developer link and "Wait 24 hours!"

### Bot 2
- Bot 2 runs automatically in the background
- Every 20 days, it will automatically call Bot 1 with the `/hello` command
- No manual interaction needed once set up

## Commands

| Command | Response |
|---------|----------|
| `/hello` | Discord Active Developer link + "Wait 24 hours!" |

## Files

- `bot.js` - Main bot (Bot 1) that responds to slash commands
- `bot2.js` - Auto-caller bot (Bot 2) that calls Bot 1 every 20 days
- `package.json` - Dependencies and scripts

## Permissions Required

Both bots need the "Send Messages" permission to function properly.
Bot 1 also needs "Use Slash Commands" permission.

## Schedule

Bot 2 is scheduled to call Bot 1 every 20 days at midnight (00:00).
The schedule can be modified in the cron pattern in `bot2.js`.

## Troubleshooting

- Make sure both bot tokens are correct
- Ensure both bots have permission to read and send messages in the channels
- Check that both bots are online in your server's member list
- For Bot 2, make sure the Guild ID and Channel ID are correct
- Bot 1 must be in the same server and channel that Bot 2 is configured to target