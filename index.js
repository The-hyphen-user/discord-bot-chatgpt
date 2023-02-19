//generic discord hook up so i can plug in different js files to access different bots
const { ChatGPTCall } = require('./openai.js');
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

const { SlashCommandBuilder } = require('@discordjs/builders');
const chatgptCommand = new SlashCommandBuilder()
  .setName('chatgpt')
  .setDescription('ChatGPT using write sonics service')
  .addStringOption(option =>
    option.setName('message')
      .setDescription('The message to send')
      .setRequired(true));

client.on('ready', async () => {
  const guildId = '';//skp server
  const command = await client.application.commands.create(chatgptCommand, guildId);

});

client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'chatgpt') {
      console.log('command used: ' + interaction.commandName)
      const message = interaction.options.getString('message');

      const user = interaction.member.user;
      const nickname = interaction.member.nickname;
      const username = nickname ? nickname : user.username;
      interaction.reply(`generating response... \n Beep Boop Fucking your mom!`);
      const response = await ChatGPTCall(message);
      await interaction.editReply(`Beep Boop Fucking your mom complete:\n${username}: ${message}\nChatGPT: ${response}`);
    }
  } catch (err) {
    await interaction.reply('There was an error while executing this command!');
  }
});
client.login('')
console.log('ChatGPT is running')