const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "fix",
    aliases: ["sahi ho"],
    category: "Music",
    description: "Leave voice channel",
    args: false,
    usage: "",
    permission: ["MANAGE_GUILD"],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
       
        const player = message.client.manager.get(message.guild.id);

        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
        .setAuthor({ name: `|  Successfully fixed player in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()})
          return message.channel.send({embeds: [thing]});
	
    }
};