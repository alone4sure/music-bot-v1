const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
const { Player } = require("erela.js");
module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "Plays audio from any supported source.",
  args: true,
  usage: "<song URL or name>",
  userPerms: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.resolve(["Speak", "Connect"])
      )
    ) 
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor(client.embedColor)
          .setAuthor({name:`| I don't have enough permissions to execute this command! Please give me permission to \`CONNECT\` or \`SPEAK\ `,
      iconURL: message.author.displayAvatarURL()}),
        ],
      });
    const { channel } = message.member.voice;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.resolve(["Speak", "Connect"]))
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| I don't have enough permissions connect your VC! Please give me permission to \`CONNECT\` or \`SPEAK\` `,
      iconURL: message.author.displayAvatarURL()}),
        ],
      });

    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;
    /**
     * @type {Player}
     */
    let player = client.manager.get(message.guild.id);

    if (!player)
      player = await client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
        volume: 100,
      }); 
    
    if(args[0].startsWith(`https://www.youtube.com/watch`)) return message.channel.send({embeds: [new EmbedBuilder ().setColor(client.embedColor)
       .setDescription(`We are sorry to inform you that we have stopped streaming YouTube music as it is against discord terms of service Otherwise Use A Search Query To Use Our Default System. `)]});
            if(args[0].startsWith(`https://youtu.be`)) return message.channel.send({embeds: [new EmbedBuilder ().setColor(client.embedColor)
       .setDescription(`We are sorry to inform you that we have stopped streaming YouTube music as it is against discord terms of service Otherwise Use A Search Query To Use Our Default System. `)]});
            if(args[0].startsWith(`https://www.youtube.com/playlist?list=`)) return message.channel.send({embeds: [new Embedbuilder ().setColor(client.embedColor)
      .setDescription(`We are sorry to inform you that we have stopped streaming YouTube music as it is against discord terms of service Otherwise Use A Search Query To Use Our Default System. `)]});
            if(args[0].startsWith(`https://youtube.com/playlist?list=`)) return message.channel.send({embeds: [new EmbedBuilder ().setColor(client.embedColor)
       .setDescription(`We are sorry to inform you that we have stopped streaming YouTube music as it is against discord terms of service Otherwise Use A Search Query To Use Our Default System. `)]});
            if(args[0].startsWith(`https://youtube.com/shorts`)) return message.channel.send({embeds: [new EmbedBuilder ().setColor(client.embedColor)
       .setDescription(`We are sorry to inform you that we have stopped streaming YouTube music as it is against discord terms of service Otherwise Use A Search Query To Use Our Default System. `)]});

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(" ");
    
    let res;
try {
      res = await player.search(search, message.author);
      if (!player)
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
          .setAuthor({name:`| Nothing is playing right now `,
      iconURL: message.author.displayAvatarURL()}),
          ],
        });
      if (res.loadType === "LOAD_FAILED") {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(
        `There was an error while searching: ${err.message}`
      );
    }
    switch (res.loadType) {
      case "NO_MATCHES":
        if (!player.queue.current) player.destroy();
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(client.embedColor)
          .setAuthor({name:`| No match found for - ${search} `,
      iconURL: message.author.displayAvatarURL()}),
          ],
        });

      case "TRACK_LOADED":
        var track = res.tracks[0];
            if (convertTime(track.duration)< convertTime(15000)) {return message.reply({content:`Song is to short to play`})}
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| queued at position #${player.queue.size}.`, iconURL:track.requester.displayAvatarURL({ dynamic: true })})
    .setDescription(`
  [${track.title.substring(0, 63)}](https://discord.gg/uYvTGBSrz6) [${convertTime(track.duration)}] - [<@${track.requester.id}>]`);
          return message.channel.send({ embeds: [thing] });
        }
      case "PLAYLIST_LOADED":
        player.queue.add(res.tracks);
        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();
        const thing = new EmbedBuilder()
          .setColor(client.embedColor)
          .setAuthor({name:`|  Added playlist queued `, iconURL:client.user.displayAvatarURL()})
    .setDescription(`\n${
              res.tracks.length
            } Songs [${res.playlist.name}](${search}) - \`[${convertTime(
              res.playlist.duration
            )}]\`` );
        return message.channel.send({ embeds: [thing] });
      case "SEARCH_RESULT":
        var track = res.tracks[0];
            if (convertTime(track.duration)< convertTime(15000)) {return message.reply({content:`Song is to short to play`})}
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| queued at position #${player.queue.size}.`, iconURL:track.requester.displayAvatarURL({ dynamic: true })})
    .setDescription(`
  [${track.title.substring(0, 63)}](https://discord.gg/uYvTGBSrz6) [${convertTime(track.duration)}] - [<@${track.requester.id}>]`);
    
         return message.channel.send({ embeds: [thing] });
        }
    }
  },
};
