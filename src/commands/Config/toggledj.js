const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    category: "Config",
    description: "Toggles DJ mode.",
    args: false,
    usage: "",
    aliases: ["djoff", "djon"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });

        if(!data) return message.channel.send({embeds:[new EmbedBuilder().setAuthor({ name: `| You don't have a Dj role setup in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)]})

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.channel.send({embeds: [new EmbedBuilder().setAuthor({ name: `| Enabled Dj mode in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)]})
        } else {
           return await message.channel.send({embeds: [new EmbedBuilder().setAuthor({ name: `| Disabled Dj mode in ${message.guild.name}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)]})
        }
    }
}