const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "create",
    aliases: ["plcreate"],
    category: "Playlist",
    description: "Creates the user's playlist.",
    args: true,
    usage: "<playlist name>",
    userPerms: [],
  voteonly: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        var color = client.embedColor;
        const Name = args[0].replace(/_/g, ' ');
        if (Name[0].length < 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setDescription("Provide a playlist name.")] });
        };

        if (Name.length > 10) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({ name: `| Playlist name can't be greater than 10 characters.`, iconURL:message.author.displayAvatarURL()})] });
        };
        let data = await db.find({
            UserId: message.author.id,
            PlaylistName: Name,
        });

        if (data.length > 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColo).setAuthor({ name: `| This name playlist already exists!`, iconURL:message.author.displayAvatarURL()})] })
        };
        let userData = db.find({
            UserId: message.author.id
        });
        if (userData.length >= 10) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({ name: `| You can only create 10 playlist.`, iconURL:message.author.displayAvatarURL()})] })
        }

        const newData = new db({
            UserName: message.author.tag,
            UserId: message.author.id,
            PlaylistName: Name,
            CreatedOn: Math.round(Date.now() / 1000)
        });
        await newData.save();
        const embed = new EmbedBuilder()
          .setColor(client.embedColor)
            .setAuthor({ name: `| Playlist created ${Name} `, iconURL:message.author.displayAvatarURL()})
        return message.channel.send({ embeds: [embed] })

    }
};
