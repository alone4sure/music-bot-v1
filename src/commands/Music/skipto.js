const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skipto",
    aliases: ["jump"],
    category: "Music",
    description: "Skip to a specific song.",
    args: true,
    usage: "<song # in queue>",
    userPerms: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("Red")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new EmbedBuilder()
                .setColor("Red")
				.setDescription(`Usage: ${message.client.prefix}skipto <song # in queue>`)
            return message.channel.send({embeds: [thing]});
		}

        player.queue.remove(0, position);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new EmbedBuilder()
			.setDescription(`${emojijump} Skipped to song **${position}**.`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return message.channel.send({embeds: [thing]});
	
    }
};
