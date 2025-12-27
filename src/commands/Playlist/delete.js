const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "delete",
    aliases: ["pldelete"],
    category: "Playlist",
    description: "Delete your saved playlist.",
    args: true,
    usage: "<playlist name>",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const Name = args[0].replace(/_/g, ' ');
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({ name: `| Playlist not found ${Name}`, iconURL:message.author.displayAvatarURL()})] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({ name: `| Playlist not found ${Name}`, iconURL:message.author.displayAvatarURL()})] });
        }
        await data.delete();
        const embed = new EmbedBuilder()
            .setColor(client.embedColor)
            .setAuthor({ name: `| successfully deleted ${Name} playlist`, iconURL:message.author.displayAvatarURL()})
        return message.channel.send({ embeds: [embed] })
    }
}
