const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  category: "Music",
  description: "Skip the song currently playing.",
  args: false,
  usage: "",
  userPerms: [],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
          .setAuthor({name:`| There is no music playing `,
      iconURL: message.author.displayAvatarURL()});
      return message.channel.send({ embeds: [thing] });
    }
    const song = player.queue.current;

    player.stop();

    const emojiskip = message.client.emoji.skip;

    let thing = new EmbedBuilder()
     .setColor(client.embedColor)
      .setAuthor({name:`| Current song is skipped`,
      iconURL: message.author.displayAvatarURL()})
    
    return message.channel.send({ embeds: [thing] })
  },
};
