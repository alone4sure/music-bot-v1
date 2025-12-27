const { EmbedBuilder} = require("discord.js");
module.exports = {
    name: "bassboost",
    category: "filters",
    aliases: [ "bb" ],
    premium: true,
    description: "To get user banner",
    args: false,
    usage: "",
    permission: [],
    botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

const player = message.client.manager.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
          .setAuthor({name:`| There is no music playing`,
      iconURL: message.author.displayAvatarURL()});
            return message.channel.send({ embeds: [thing] });
        }
             
        var bands = new Array(7).fill(null).map((_, i) => (
          { band: 0, gain: 0.12} ));
          await player.setEQ(...bands);
           
    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
          .setAuthor({name:`| Bassboost mode is on in ${message.guild.name} `,
      iconURL: message.author.displayAvatarURL()})
      const m = await message.channel.send({ embeds: [embed]});
     }
}