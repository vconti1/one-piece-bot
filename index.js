
const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token, mangadex_id } = require('./config.json');
const { get } = require('http');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
client.login(token);

client.on('messageCreate', async (message) => {
  if (message.content === '!box'){
  try {
  const title = await getManga();

   const embed = new EmbedBuilder()
   .setColor(0x0099FF)
   .setTitle(title ?? 'This should return as fallback')
   .setDescription('First ever chapter!')
   .addFields(
    { name: 'Field 1', value: 'STUFF' },
    { name: 'Field 2', value: 'Another value here'}
   )
   .setTimestamp()
   .setFooter({ text: 'Box Bot', iconURL: 'https://i.imgur.com/AfFp7pu.png'})

   message.channel.send({ embeds: [embed]});
  }catch(error) {
    console.error(error)
  }
  }
  
})

async function getManga(){
  const mangaId = mangadex_id;
  const url = new URL(`https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=en`)

  const res =  await fetch(url);
  const json = await res.json();
  

  return json.data[0].attributes.title;
}

