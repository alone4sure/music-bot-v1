const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder} = require("discord.js");

module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Help with all commands, or one specific command.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
 execute: async (message, args, client, prefix) => {

  const embed = new EmbedBuilder()
.setAuthor({name:`| Resso Help Menu `,
      iconURL: message.author.displayAvatarURL()})     
 .setDescription (`
 **Utility [8]**\n\`help, Redeem, profile, invite, ping, support, stats, vote, about, uptime\`
 
**Filters [10]**\n\`clearfilter, 8d, bassboost, bass, distort, equalizer, nighcore, pitch, speed, vaporwave\`

**Musics [21]**\n\`247, autoplay, clearqueue, join, leave, loop, lyrics, nowplaying, pause, play, queue, remove, resume, same, search, seek, shuffle, skip, skipto, stop, volume,\`

**Playlist [8]**\n\`create, delete, info, list, load, removetrack, savecurrent, savequeue\`

**Settings [6]**\n\`prefix, setchannel, adddj, fix, removedj, setprefix, toggledj\`

**Sources [4]**\n\`Spotify, AppleMusic, SoundCloud, Facebook, Deezer\`

**Use ${prefix}help <command> to get more information about command.**`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setTimestamp()
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
   const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
        new ButtonBuilder()
          .setLabel("vote me")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://top.gg/bot/1023571747133468703`),
        new ButtonBuilder()
          .setLabel("Support server")
          .setStyle(ButtonStyle.Link)
  .setURL(`${client.config.links.support}`));
   message.channel.send({embeds: [embed], components: [row]})
      }
}