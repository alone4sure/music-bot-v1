const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: "Config",
    description: "Removes the DJ role.",
    args: false,
    usage: "",
    aliases: ["romdj", "rdj", "rmdj"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.channel.send({ embeds: [new EmbedBuilder()
        .setAuthor({ name: `| Successfully removed all Dj roles in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
        } else return message.channel.send({ embeds: [new EmbedBuilder()
        .setAuthor({ name: `| You don't have and Dj role setup in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })

    }
}
