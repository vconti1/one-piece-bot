const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const { token, mangadex_id, lang_en, most_recent_chapter, send_on_startup, channel_id, poll_minutes } = require('./config.json');
const fs = require('fs');
const path = require('path');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const STATE_PATH = path.join(__dirname, 'state.json');
let state = {};

try { 
  state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
 } catch { 
  state = {}; 
}

const saveState = () => fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));

async function getLatestChapter() {
  const url = new URL(`https://api.mangadex.org/manga/${mangadex_id}/feed?${lang_en}&limit=1&${most_recent_chapter}`)
  const res =  await fetch(url);
  const json = await res.json();
  
  return json.data[0]; 
}

async function accounce(channel) {
  const latest = getLatestChapter();
  if (!latest) return;

  const embed = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(`NEW CHAPTER RELEASE`)
  .setDescription(`Chapter **${data.attributes.chapter}** | *${data.attributes.title}*`)
  .addFields(
    { name: 'Read it now!', value: data.attributes.externalUrl ?? 'jk' } // lol
  )
  .setTimestamp()
  .setFooter({ text: 'Mugiwara No Luffy', iconURL: client.user.displayAvatarURL()})

  await channel.send({ embeds: [embed]});
}

async function checkAndAnnounce(channel) {
  const latest = await getLatestChapter();
  if (!latest) return;

  const lastSeen = state[mangadex_id];

  if (!lastSeen && !send_on_startup) {
    state[mangadex_id] = latest.id;
    saveState();
    return;
  }

  if (latest.id !== lastSeen) {
    await accounce(channel);
    state[mangadex_id] = latest.id;
    saveState();
  }
}

client.once(Events.ClientReady, async () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(channel_id);

  if(!channel?.isTextBased()) {
    console.error('CHANNEL_ID is invalid or not a text channel.')
    process.exit(1);
  }
  // Initial check
  await checkAndAnnounce(channel);

  const interval = Math.max(1, Number(poll_minutes)) * 60_000
  setInterval(() => checkAndAnnounce(channel).catch(console.error), interval);
})

client.login(token);

