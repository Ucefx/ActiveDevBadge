# Discord Active Developer Bot

A clean, professional Discord bot that helps you maintain your Discord Active Developer status by providing the active developer link through slash commands.

## ✨ Features

- 🤖 **Interactive Setup** - Prompts for bot token with validation
- 🔗 **Auto Invite Link** - Generates and displays invite link automatically  
- ⚡ **Slash Commands** - Modern Discord slash command support
- 🎨 **Rich Embeds** - Beautiful embedded responses with formatting
- 🛡️ **Error Handling** - Comprehensive error handling and validation
- 🎯 **Active Developer** - Helps maintain Discord Active Developer status
- 🖥️ **Clean Interface** - Colorful console output with clear status messages

## 🚀 Quick Start

### Step 1: Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the sidebar
4. Click "Add Bot" 
5. Copy the bot token (keep it secret!)

### Step 2: Run on Replit
1. Run the bot: `npm start`
2. Paste your bot token when prompted
3. Copy the generated invite link
4. Use the invite link to add the bot to your server

### Step 3: Use the Bot
- Use `/hello` slash command in any channel
- Bot responds with the Discord Active Developer link
- Wait 24 hours before claiming your badge!

## 📋 Commands

| Command | Description | Response |
|---------|-------------|----------|
| `/hello` | Get Active Developer link | Rich embed with link and instructions |

## 🔧 Technical Details

- **Framework**: Discord.js v14
- **Commands**: Slash commands with auto-registration
- **Permissions**: Send Messages + Use Slash Commands
- **Intents**: Guilds, Guild Messages, Message Content
- **Error Handling**: Comprehensive with fallback responses

## 🎨 Features Showcase

- **Colorful Console**: Beautiful colored output for better readability
- **Input Validation**: Token format validation and error messages
- **Rich Embeds**: Professional-looking embedded responses
- **Graceful Shutdown**: Clean shutdown process with Ctrl+C
- **Auto-Recovery**: Automatic retry on connection failures

## 🛡️ Security

- Token validation before connection attempts
- Secure token handling (never logged or displayed)
- Error messages don't expose sensitive information
- Graceful handling of permission issues

## 📱 Permissions Required

The bot needs these permissions to function:
- **Send Messages** - To respond to commands
- **Use Slash Commands** - To register and use slash commands

## 🔄 Active Developer Program

This bot helps you maintain your Discord Active Developer status by:
1. Providing easy access to the active developer link
2. Encouraging regular bot usage through slash commands
3. Reminding users to wait 24 hours before claiming

## 🎯 Perfect for Replit

- No external dependencies beyond Discord.js
- Interactive token input (no environment variables needed)
- Clean console output perfect for Replit's interface
- Automatic invite link generation
- One-command startup

## 📞 Support

If you encounter any issues:
1. Check that your bot token is correct
2. Ensure the bot has proper permissions in your server
3. Verify the bot is online in your server's member list
4. Make sure slash commands are enabled in your server

---

**Made for Discord Active Developer Program** 🎯