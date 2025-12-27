const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pauses the music currently playing.",
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
                  .setAuthor({ name: `| Please play one song before using this command`,
                  iconURL:message.author.displayAvatarURL()});
            return message.channel.send({embeds: [thing]});
        }

        if (player.paused) {
            let thing = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| The music is already pause `,
      iconURL: message.author.displayAvatarURL()})
                return message.channel.send({embeds: [thing]});
        }

        player.pause(true);

        const song = player.queue.current;

        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| Current song is pause now `, iconURL: message.author.displayAvatarURL()})
          return message.channel.send({embeds: [thing]});
	
    }
};
