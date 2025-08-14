
const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
client.login(token);

client.on('messageCreate', message => {
  if (message.content === '!box'){
   const embed = new EmbedBuilder()
   .setColor(0x0099FF)
   .setTitle('This is a box message')
   .setDescription('This is a cool ass despriction')
   .addFields(
    { name: 'Field 1', value: 'Some random ass value' },
    { name: 'Field 2', value: 'Another value here', inline: true }
   )
   .setTimestamp()
   .setFooter({ text: 'Box Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png'})
   
   message.channel.send({ embeds: [embed]});
  }
  
})

