const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let botToken = '';

// Enhanced slash command definition
const commands = [
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Get the Discord Active Developer link and wait 24 hours')
    .toJSON(),
];

// Utility functions
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function displayHeader() {
  console.clear();
  log('╔══════════════════════════════════════╗', colors.cyan);
  log('║        🤖 Discord Bot Setup          ║', colors.cyan);
  log('║     Enhanced Active Developer Bot    ║', colors.cyan);
  log('╚══════════════════════════════════════╝', colors.cyan);
  console.log();
}

function displaySuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function displayError(message) {
  log(`❌ ${message}`, colors.red);
}

function displayInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function displayWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

// Function to ask for bot token with validation
function askForToken() {
  displayHeader();
  displayInfo('Please enter your Discord bot token below: Press Ctrl+Shift+V to Paste');
  displayWarning('Keep your token secure and never share it publicly!');
  console.log();
  
  rl.question('🔑 Bot Token: ', (token) => {
    if (!token || token.trim() === '') {
      displayError('Invalid token! Token cannot be empty.');
      console.log();
      setTimeout(askForToken, 1500);
      return;
    }
    
    // Basic token format validation
    const tokenPattern = /^[A-Za-z0-9._-]+$/;
    if (!tokenPattern.test(token.trim())) {
      displayError('Invalid token format! Please check your token.');
      console.log();
      setTimeout(askForToken, 1500);
      return;
    }
    
    botToken = token.trim();
    startBot();
  });
}

// Function to generate enhanced invite link
function generateInviteLink(clientId) {
  const permissions = '2147483648'; // Send Messages permission
  const scopes = 'bot%20applications.commands'; // Bot and slash commands
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=${scopes}`;
  return inviteLink;
}

// Function to start the bot with enhanced error handling
async function startBot() {
  try {
    console.log();
    displayInfo('Connecting to Discord...');
    
    // Login to Discord
    await client.login(botToken);
    
  } catch (error) {
    console.log();
    displayError(`Failed to connect: ${error.message}`);
    
    if (error.message.includes('TOKEN_INVALID')) {
      displayError('The provided token is invalid!');
    } else if (error.message.includes('DISALLOWED_INTENTS')) {
      displayError('Bot intents are not properly configured in Discord Developer Portal!');
    } else {
      displayError('Please check your token and internet connection.');
    }
    
    console.log();
    displayInfo('Please try again with a valid token...');
    setTimeout(askForToken, 2000);
  }
}

// Function to register slash commands with better error handling
async function registerCommands() {
  try {
    const rest = new REST({ version: '10' }).setToken(botToken);
    
    displayInfo('Registering slash commands...');
    
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    
    displaySuccess('Slash commands registered successfully!');
  } catch (error) {
    displayError(`Failed to register slash commands: ${error.message}`);
  }
}

// Enhanced ready event
client.once('ready', async () => {
  console.log();
  log('╔══════════════════════════════════════╗', colors.green);
  log('║            🎉 BOT ONLINE!            ║', colors.green);
  log('╚══════════════════════════════════════╝', colors.green);
  console.log();
  
  displaySuccess(`Logged in as: ${client.user.tag}`);
  displayInfo(`Bot ID: ${client.user.id}`);
  displayInfo(`Serving ${client.guilds.cache.size} servers`);
  console.log();
  
  // Register slash commands
  await registerCommands();
  console.log();
  
  // Generate and display enhanced invite link
  const inviteLink = generateInviteLink(client.user.id);
  log('╔══════════════════════════════════════╗', colors.magenta);
  log('║             🔗 INVITE LINK           ║', colors.magenta);
  log('╚══════════════════════════════════════╝', colors.magenta);
  console.log();
  log(inviteLink, colors.cyan);
  console.log();
  
  displayInfo('Copy the link above to invite the bot to your server!');
  console.log();
  
  log('╔══════════════════════════════════════╗', colors.blue);
  log('║            📋 COMMANDS               ║', colors.blue);
  log('║  /hello - Get Active Developer Link  ║', colors.blue);
  log('╚══════════════════════════════════════╝', colors.blue);
  console.log();
  
  displaySuccess('Bot is ready and waiting for commands!');
  log('Press Ctrl+C to stop the bot', colors.yellow);
});

// Enhanced slash command handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  
  if (interaction.commandName === 'hello') {
    try {
      // Create an enhanced embed response
      const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle('🎯 Discord Active Developer')
        .setDescription('Click the link below to access the Discord Active Developer page!')
        .addFields(
          {
            name: '🔗 Active Developer Link',
            value: '[Click Here](https://discord.com/developers/active-developer)',
            inline: false
          },
          {
            name: '⏰ Important',
            value: '**Wait 24 hours** after using the bot before claiming your badge!',
            inline: false
          },
          {
            name: '💡 Tip',
            value: 'Make sure to use slash commands regularly to maintain active status.',
            inline: false
          }
        )
        .setFooter({ 
          text: 'Discord Active Developer Program',
          iconURL: 'https://cdn.discordapp.com/emojis/1234567890123456789.png'
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
      
      // Enhanced logging
      const user = interaction.user;
      const guild = interaction.guild;
      log(`📨 Command executed by ${user.tag} (${user.id}) in ${guild ? guild.name : 'DM'}`, colors.green);
      
    } catch (error) {
      displayError(`Failed to respond to command: ${error.message}`);
      
      // Fallback response
      try {
        await interaction.reply({
          content: '🎯 **Discord Active Developer**\n\nhttps://discord.com/developers/active-developer\n\n⏰ **Wait 24 hours!**',
          ephemeral: true
        });
      } catch (fallbackError) {
        displayError(`Fallback response also failed: ${fallbackError.message}`);
      }
    }
  }
});

// Enhanced error handling
client.on('error', (error) => {
  displayError(`Bot error: ${error.message}`);
});

client.on('warn', (warning) => {
  displayWarning(`Bot warning: ${warning}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log();
  log('╔══════════════════════════════════════╗', colors.yellow);
  log('║          👋 SHUTTING DOWN            ║', colors.yellow);
  log('╚══════════════════════════════════════╝', colors.yellow);
  console.log();
  
  displayInfo('Disconnecting from Discord...');
  client.destroy();
  rl.close();
  
  setTimeout(() => {
    displaySuccess('Bot shut down successfully!');
    process.exit(0);
  }, 1000);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  displayError(`Uncaught Exception: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  displayError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Start the application
askForToken();
