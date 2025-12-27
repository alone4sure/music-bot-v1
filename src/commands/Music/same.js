const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "same",
  category: "Music",
  description: "Toggle music autoplay.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.get(message.guild.id);

    if (!player.queue.current)
      return message.reply({
        content: `Please play a song before using this command.`,
      });
 {
      const identifier = player.queue.current.identifier;
      player.set("requester", client.user);
      player.set("identifier", identifier);
      const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
      const res = await player.search(search, message.author);
      player.queue.add(
        res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 1]
      );
      let thing = new EmbedBuilder()
                    .setColor(client.embedColor)
          .setAuthor({name:`|  Added similar song to queue `, iconURL:client.user.displayAvatarURL()});


      return message.channel.send({ embeds: [thing] });
    }
  },
}