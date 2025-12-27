const { EmbedBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Show the current playing song.",
    args: false,
    usage: "",
    userPerms: [],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                              .setAuthor({ name: `| Please play one song before using this command`,
                  iconURL:message.author.displayAvatarURL()});
            return message.channel.send({ embeds: [thing] });
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`|  Now playing `, iconURL: message.author.displayAvatarURL()})
    .setDescription(` [${song.title.substring(0, 63)}](https://discord.gg/uYvTGBSrz6)\n\n**Requester: **${song.requester}| **Duration: **\`❯ ${convertTime(song.duration)}\``)
            .setThumbnail(song.displayThumbnail("3"))
  .addFields([
                {name: '\u200b', value: `\`${convertTime(current)} / ${convertTime(total)}\``},
            ])
            return message.channel.send({embeds: [embed]})

    }
}
