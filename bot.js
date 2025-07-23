const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
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

// Function to ask for bot token
function askForToken() {
  console.log('🤖 Discord Bot Setup');
  console.log('====================');
  rl.question('Please enter your Discord bot token: ', (token) => {
    if (!token || token.trim() === '') {
      console.log('❌ Invalid token! Please try again.');
      askForToken();
      return;
    }
    
    botToken = token.trim();
    startBot();
  });
}

// Function to generate invite link
function generateInviteLink(clientId) {
  const permissions = '2147483648'; // Send Messages permission
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot`;
  return inviteLink;
}

// Function to start the bot
async function startBot() {
  try {
    console.log('🚀 Starting bot...');
    
    // Login to Discord
    await client.login(botToken);
    
  } catch (error) {
    console.error('❌ Failed to login:', error.message);
    console.log('Please check your token and try again.');
    askForToken();
  }
}

// Event when bot is ready
client.once('ready', () => {
  console.log('✅ Bot is online!');
  console.log(`📋 Logged in as: ${client.user.tag}`);
  console.log(`🆔 Bot ID: ${client.user.id}`);
  
  // Generate and display invite link
  const inviteLink = generateInviteLink(client.user.id);
  console.log('\n🔗 Invite Link:');
  console.log('================');
  console.log(inviteLink);
  console.log('\nCopy this link to invite the bot to your server!');
  console.log('\n💡 Available Commands:');
  console.log('- Type "?hello" in any channel to get a response!');
  console.log('\n⚡ Bot is now running and ready to receive commands...');
});

// Event listener for messages
client.on('messageCreate', (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;
  
  // Check if message content is "hello" (case insensitive)
  if (message.content.toLowerCase() === '?hello') {
    message.reply('hellooo! 👋');
    console.log(`📨 Replied to ${message.author.tag} in #${message.channel.name}`);
  }
});

// Handle errors
client.on('error', (error) => {
  console.error('❌ Bot error:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down bot...');
  client.destroy();
  rl.close();
  process.exit(0);
});

// Start the application
console.clear();
askForToken();