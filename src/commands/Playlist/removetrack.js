const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "removetrack",
    aliases: ["plremovet"],
    category: "Playlist",
    description: "Remove a track from your saved playlist.",
    args: true,
    usage: "<playlist name> <track number>",
    userPerms: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        var color = client.embedColor;

        const Name = args[0].replace(/_/g, ' ');
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setAuthor({ name: `| Playlist not found ${Name}`, iconURL:message.author.displayAvatarURL()})] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setAuthor({ name: `| Playlist not found ${Name}`, iconURL:message.author.displayAvatarURL()})] });
        }
        const Options = args[1];
        if (!Options || isNaN(Options)) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setAuthor({ name: `| Give me valid song number.`, iconURL:message.author.displayAvatarURL()})] });
        }
        let tracks = data.Playlist;
        if (Number(Options) >= tracks.length || Number(Options) < 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(color).setAuthor({ name: `| You don't have any song in number you give me.`, iconURL:message.author.displayAvatarURL()})] });

        }
        await db.updateOne({
            UserId: message.author.id,
            PlaylistName: Name
        },
            {
                $pull: {
                    Playlist: data.Playlist[Options]
                }
            });
            const embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `| successfully removed ${tracks[Options].title} from ${Name}`, iconURL:message.author.displayAvatarURL()});
            return message.channel.send({embeds: [embed]});
    }
};
