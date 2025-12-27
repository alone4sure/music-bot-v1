const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ['loop'],
    category: "Music",
    description: "Toggles loop mode.",
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
            return message.channel.send({ embeds: [thing] });
        }
        const emojiloop = message.client.emoji.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
          .setAuthor({name:`| Loop queue is now ${queueRepeat} `,
      iconURL: message.author.displayAvatarURL()})
    
  return message.channel.send({ embeds: [thing] });
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| Loop track is now ${trackRepeat} `,
      iconURL: message.author.displayAvatarURL()})
        return message.channel.send({ embeds: [thing] });
    }
};
