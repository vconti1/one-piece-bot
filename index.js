
const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token, mangadex_id, lang_en, most_recent_chapter } = require('./config.json');
const { get } = require('http');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
client.login(token);

client.on('messageCreate', async (message) => {
  if (message.content === '!box'){
  try {
  const data = await getManga();

   const embed = new EmbedBuilder()
   .setColor(0x0099FF)
   .setTitle(`NEW CHAPTER RELEASE` ?? `Something went wrong`)
   .setDescription(`Chapter ${data.attributes.chapter} | ${data.attributes.title}` ?? `Could not get chapter info`)
   .addFields(
    { name: 'Read it now!', value: data.attributes.externalUrl }
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
  //const mangaId = mangadex_id;
  const url = new URL(`https://api.mangadex.org/manga/${mangadex_id}/feed?${lang_en}&limit=1&${most_recent_chapter}`)

  const res =  await fetch(url);
  const json = await res.json();
  
  return json.data[0]; 
}

