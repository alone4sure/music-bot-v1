const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'pitch',
  category: 'Filters',
  aliases: ['pitch'],
  description: 'Set Bassboost Filter',
  args: false,
  usage: '',
  userPrams: [],
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
    {
                await player.setPitch(2);
                
        const embed = new EmbedBuilder()
      .setColor(client.embedColor)
          .setAuthor({name:`| Pitch mode is on in ${message.guild.name}`,
      iconURL: message.author.displayAvatarURL()})
      const m = await message.channel.send({ embeds: [embed]});
      }
    }
}