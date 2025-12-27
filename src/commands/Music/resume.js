const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "resume",
    aliases: ["r"],
    category: "Music",
    description: "Resume playing music.",
    args: false,
    usage: "",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);
        const song = player.queue.current;

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                  .setAuthor({ name: `| Please play one song before using this command`,
                  iconURL:message.author.displayAvatarURL()});
            return message.channel.send({embeds: [thing]});
        }

        const emojiresume = client.emoji.resume;

        if (!player.paused) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name:`| The music is already resumed `,
      iconURL: message.author.displayAvatarURL()})
          return message.channel.send({embeds: [thing]});
        }

        player.pause(false);

        let thing = new EmbedBuilder()
          .setAuthor({name:`| Current song is now resume`, iconURL: message.author.displayAvatarURL()})
        return message.reply({embeds: [thing]});
	
    }
};
