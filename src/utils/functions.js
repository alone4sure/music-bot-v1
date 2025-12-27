const {
  Message,
  EmbedBuilder,
  Client,
  TextChannel,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const { Player } = require("erela.js");
const Model = require("../schema/247");
const MusicBot = require("../structures/Client");
const { convertTime } = require("./convert");

async function check(client, guild, textchannel, voicechannel) {
  let isGuild;
  let isChannel;
  const resolveGuild = await client.guilds.fetch(guild).catch(() => isGuild = false);

  if (isGuild === false) return false;

  await resolveGuild.channels.fetch(textchannel).catch(() => isChannel = false);
  await resolveGuild.channels.fetch(voicechannel).catch(() => isChannel = false);

  if (isChannel === false) return false;

  return true;
}

async function AutoConnect(data, client) {
  const { status, guild, voicechannel, textchannel } = data;
  const obtainedBool = await check(client, guild, textchannel, voicechannel);

  if (!obtainedBool) {
    const data = await Model.findOne({ Guild: guild, VoiceChannel: voicechannel, TextChannel: textchannel });
    if (!data) return;
    await data.delete();
    return
  }
  let player = client.manager.players.get(guild);
  if (!player && status)
    player = client.manager.create({
      guild,
      voiceChannel: voicechannel,
      textChannel: textchannel,
      selfDeafen: true,
      selfMute: false,
    });

  if(player && player.state !== "CONNECTED") player.connect();

  return (player.twentyFourSeven = status);
}

module.exports = {
  AutoConnect,
};