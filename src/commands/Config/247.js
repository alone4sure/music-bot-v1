const { EmbedBuilder } = require("discord.js");
const Model = require("../../schema/247");
module.exports = {
  name: "247",
  aliases: ["24h", "24/7", "24*7"],
  category: "Config",
  description: "Sets 24/7 mode, bot stays in voice channel 24/7.",
  args: false,
  usage: "",
  owner: false,
  voteonly: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
          if (!message.member.permissions.has('ManageChannels') && !'261553832549548032'.includes(message.author.id)) return message.channel.send({embeds: [new EmbedBuilder()        .setColor(client.embedColor)
        .setAuthor({ name: `| You must have manage channel permission to use this command`,
                  iconURL:message.author.displayAvatarURL()})]});
    const player = message.client.manager.players.get(message.guild.id);
    const data = await Model.findOne({ Guild: message.guild.id });
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({ name: `|  Disable 247 In ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()});

      message.channel.send({ embeds: [embed] });
    } else {
      player.twentyFourSeven = true;
      const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({ name: `|  Enable 247 In ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()});


      message.channel.send({ embeds: [embed] });
    }

    if (!data)
      return await Model.create({
        Guild: player.guild,
        247: player.twentyFourSeven,
        VoiceChannel: message.guild.members.me.voice?.channelId,
        TextChannel: message.channelId,
      });

    await data.update({
      Guild: player.guild,
      247: player.twentyFourSeven,
      VoiceChannel: message.guild.members.me.voice?.channelId,
      TextChannel: message.channelId,
    });
  },
};