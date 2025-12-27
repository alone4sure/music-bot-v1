const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq", "clear"],
    category: "Music",
    description: "Removes all songs in the music queue.",
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
              .setAuthor({ name: `| No song's In queue in  ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()})
            return message.channel.send({ embeds: [thing] });
        }

        player.queue.clear();

        let thing = new EmbedBuilder()
          .setColor(client.embedColor)
          .setAuthor({ name: `| successfully removed all song form queue in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()})
        return message.channel.send({ embeds: [thing] });
    }
};