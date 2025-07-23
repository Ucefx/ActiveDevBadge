const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const readline = require('readline');
const cron = require('node-cron');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create a new client instance for bot 2
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let bot2Token = '';
let targetChannelId = '';
let targetGuildId = '';

// Function to ask for bot 2 token
function askForBot2Token() {
  console.log('🤖 Discord Bot 2 Setup (Auto-caller Bot)');
  console.log('==========================================');
  rl.question('Please enter your second Discord bot token: ', (token) => {
    if (!token || token.trim() === '') {
      console.log('❌ Invalid token! Please try again.');
      askForBot2Token();
      return;
    }
    
    bot2Token = token.trim();
    askForChannelInfo();
  });
}

// Function to ask for channel information
function askForChannelInfo() {
  rl.question('Enter the Guild ID where bot 1 is located: ', (guildId) => {
    if (!guildId || guildId.trim() === '') {
      console.log('❌ Invalid Guild ID! Please try again.');
      askForChannelInfo();
      return;
    }
    
    targetGuildId = guildId.trim();
    
    rl.question('Enter the Channel ID where bot 1 should be called: ', (channelId) => {
      if (!channelId || channelId.trim() === '') {
        console.log('❌ Invalid Channel ID! Please try again.');
        askForChannelInfo();
        return;
      }
      
      targetChannelId = channelId.trim();
      startBot2();
    });
  });
}

// Function to generate invite link
function generateInviteLink(clientId) {
  const permissions = '2147483648'; // Send Messages permission
  const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot`;
  return inviteLink;
}

// Function to start bot 2
async function startBot2() {
  try {
    console.log('🚀 Starting Bot 2 (Auto-caller)...');
    
    // Login to Discord
    await client.login(bot2Token);
    
  } catch (error) {
    console.error('❌ Failed to login:', error.message);
    console.log('Please check your token and try again.');
    askForBot2Token();
  }
}

// Function to call bot 1 with /hello command
async function callBot1() {
  try {
    const guild = client.guilds.cache.get(targetGuildId);
    if (!guild) {
      console.log('❌ Could not find the target guild');
      return;
    }
    
    const channel = guild.channels.cache.get(targetChannelId);
    if (!channel) {
      console.log('❌ Could not find the target channel');
      return;
    }
    
    // Use the slash command
    await channel.send('/hello');
    console.log('✅ Successfully called Bot 1 with /hello command');
    
  } catch (error) {
    console.error('❌ Failed to call Bot 1:', error);
  }
}

// Event when bot 2 is ready
client.once('ready', () => {
  console.log('✅ Bot 2 is online!');
  console.log(`📋 Logged in as: ${client.user.tag}`);
  console.log(`🆔 Bot ID: ${client.user.id}`);
  
  // Generate and display invite link
  const inviteLink = generateInviteLink(client.user.id);
  console.log('\n🔗 Bot 2 Invite Link:');
  console.log('======================');
  console.log(inviteLink);
  console.log('\nCopy this link to invite Bot 2 to your server!');
  
  // Schedule the cron job to run every 20 days
  // Cron pattern: '0 0 */20 * *' means at 00:00 every 20 days
  cron.schedule('0 0 */20 * *', () => {
    console.log('⏰ 20 days have passed! Calling Bot 1...');
    callBot1();
  });
  
  console.log('\n📅 Bot 2 is now scheduled to call Bot 1 every 20 days!');
  console.log('🎯 Target Guild ID:', targetGuildId);
  console.log('🎯 Target Channel ID:', targetChannelId);
  console.log('\n⚡ Bot 2 is now running and monitoring...');
  
  // Close readline interface
  rl.close();
});

// Handle errors
client.on('error', (error) => {
  console.error('❌ Bot 2 error:', error);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Bot 2...');
  client.destroy();
  rl.close();
  process.exit(0);
});

// Start the application
console.clear();
askForBot2Token();