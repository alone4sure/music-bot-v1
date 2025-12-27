const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    category: "Config",
    description: "Sets the DJ role.",
    args: false,
    usage: "",
    aliases: ["adj"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: `| You haven't ping any role.`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
        if (!data) {
           data = new db({
                Guild: message.guild.id,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: `| Successfully added dj role called ${role}`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return message.channel.send({ embeds: [new EmbedBuilder() .setAuthor({ name: `| You already have dj role.`,               iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
            data.Roles.push(role.id);
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: `| Successfully added new dj role called${role}.`,                iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })

        }
    }
}
