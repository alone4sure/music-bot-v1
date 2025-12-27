const {
  EmbedBuilder, ActionRowBuilder, ButtonStyle, StringSelectMenuBuilder, ButtonBuilder, editEmbed, PermissionsBitField, PermissionFlagsBits} = require("discord.js");
const { convertTime } = require("../../utils/convert.js");
module.exports = async (client , player, track, payload, args) => {
  let guild = client.guilds.cache.get(player.guild);
  if (!guild) return;
  let channel = guild.channels.cache.get(player.textChannel)
      if (!channel.guild.members.me.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]))
      return channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
          .setAuthor({name:`| I don't have enough permissions connect your VC! Please give me permission to \`CONNECT\` or \`SPEAK\` `}),
        ],
      });
  
const emojiffilt = client.emoji.ffilt;
  const queqe = player.get("dcQ");
  const thing = new EmbedBuilder()
.setAuthor({name:`|  Now playing `, iconURL:client.user.displayAvatarURL()})
.setDescription(`[${track.title ?? queue.title}](${client.config.links.support})[${convertTime(track?.duration ?? queue.duration)}]`)
    
    .setTimestamp()
.setFooter({text: `Requested by ${track.requester.tag}`, iconURL:track.requester.displayAvatarURL({ dynamic: true })}) 
    .setColor(client.embedColor);

         
  
    const But1 = new ButtonBuilder()
    .setCustomId("replay")
    .setEmoji("<:emoji_5:1051033454625697862>")
    .setStyle(ButtonStyle.Secondary);
  const But2 = new ButtonBuilder()
    .setCustomId("vdown")
    .setEmoji("<:volDown:1052115010891022376>")
    .setStyle(ButtonStyle.Secondary);
  const But3 = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji("<:Pause:1052111872926699571>")
    .setStyle(ButtonStyle.Danger);
  const But4 = new ButtonBuilder()
    .setCustomId("vup")
    .setEmoji("<:volume:1051032615865561098>")
    .setStyle(ButtonStyle.Secondary);
  const But5 = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji("<:skip:1051032537981526056>")
    .setStyle(ButtonStyle.Secondary);
  
const row1 = new ActionRowBuilder().addComponents(
    But1,
    But2,
    But3,
    But4,
    But5
  );
  const m = await channel.send({ embeds: [thing], components: [row1] }).then(m => player.message = m);
 
  const embed = new EmbedBuilder().setColor(client.embedColor);
  const collector = m.createMessageComponentCollector({
    filter: (r)=> {
      if (
        r.guild.members.me.voice.channel &&
        r.guild.members.me.voice.channelId === r.member.voice.channelId
      )
        return true;
else          {
                   r.reply({embeds : [new EmbedBuilder().setColor(client.embedColor).setAuthor({name: `|  You aren't connected to my voice channel.`, iconURL: r.member.user.displayAvatarURL()})],ephemeral: true,
        });
        return false;
}

    },
    time: track?.duration ?? queue.duration,
  });
  collector.on("collect", async (i) => {
await i.deferReply({
ephemeral: true,
    });   
    if (i.customId === "vdown") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) - 10;
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `The current volume is: **${amount}**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    } else if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(!player.paused);
      const Text = player.paused
        ? `**Paused**`
        : `**Resume**`;
      i.editReply({
        embeds: [ 
          embed
         .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `Song have been ${Text}`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
   } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }

      await player.stop();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription("** Song is skipped**"
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });         
    } else if (i.customId === "vup") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) + 10;
      if (amount >= 150)
        return i
          .editReply({
            embeds: [
              embed
                .setAuthor({
                  name: i.member.user.tag,
                  iconURL: i.member.user.displayAvatarURL(),
                })
                .setDescription(
                  `Cannot higher the player volume further more.`
                ),
            ],
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, 10000);
          });
      await player.setVolume(amount);
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription(
              `The current volume is: **${amount}**`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
      }, 10000);
      });
   return;
    }    else if(i.customId === "replay") {
        if(!player) {
          collector.stop();
        }
        await player.seek(0);
            i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL(),
            })
            .setDescription("**Song is now on reply**"),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
      }, 10000);
      });
   return;
    }    


                  
                    });
}
