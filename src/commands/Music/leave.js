const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "leave",
    aliases: ["dc", "fuckoff"],
    category: "Music",
    description: "Disconnects the bot from your voice channel.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    dj: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);

        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new EmbedBuilder()
            .setColor(message.client.embedColor)
            .setAuthor({name:`| Left the voice channel.Thank you for using ${message.client.user.username}! `,
      iconURL: message.author.displayAvatarURL()})

          return message.channel.send({embeds: [thing]});
	
    }
};