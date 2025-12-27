const { EmbedBuilder, Message, Client, PermissionsBitField, ActionRowBuilder, ButtonStyle, ButtonBuilder, WebhookClient } = require("discord.js");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjM1NzE3NDcxMzM0Njg3MDMiLCJib3QiOnRydWUsImlhdCI6MTY4Mzk1MTk1MH0.5m6QiLKAT0SgsQSKnJiyyVbKwSe99Z5AJIXhpGJsdW0");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/dj");
const customChannel = require("../../schema/customChannel");
module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if (message.author.bot) return;
      
        let prefix = client.prefix;
        const ress = await db.findOne({ Guild: message.guildId })
        if (ress && ress.Prefix) prefix = ress.Prefix;
  
        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            const embed = new EmbedBuilder()
    .setColor(client.embedColor)
              .setAuthor({ name:` | My prefix is ${prefix} to get started send ${prefix} help To Play Music`, iconURL: client.user.displayAvatarURL()});
      message.channel.send({ embeds: [embed] })
    };
  
 
      
      let regex = new RegExp(`^<@!?${client.user.id}>`);
      let pre = message.content.match(regex) ? message.content.match(regex)[0] : prefix;
    
    if(!message.content.startsWith(pre)) return;
      

      const args === false ? message.content.slice(pre.length).trim().split(/ +/) : message.content.startsWith(pre) === true ? message.content.slice(pre.length).trim().split(/ +/) : message.content.trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||         client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

              const isCustomChannel = await customChannel.findOne({
        GuildID: message.guild.id,
      });

      if (isCustomChannel) {
        const isChannelExist = message.guild.channels.cache.get(isCustomChannel.ChannelId);

    if (!isChannelExist) {
          await isCustomChannel.delete();
        }

        if (message.channel.id !== isCustomChannel.ChannelId && isChannelExist) {
const embed = new EmbedBuilder()
       .setAuthor({ name: `| Channel blacklist` , iconURL:message.author.displayAvatarURL()})
.setDescription(`**
Try Using my Command in <#${isCustomChannel.ChannelId}>**`) 
    .setColor(client.embedColor)
            return message.channel.send({ embeds: [embed] });  
        }
  }
      if(!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages')))  return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;

        if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => { });

        const embed = new EmbedBuilder()
            .setColor(client.embedColor)

        if (command.args && !args.length) {
           embed.setAuthor({ name: `|  You Didn't give a link or search terms.` , iconURL:message.author.displayAvatarURL()})
            return message.channel.send({ embeds: [embed] });
        }       

        if (command.botPerms) {
            if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
                embed.setDescription(`I don't have **\`${command.botPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
        if (command.userPerms) {
            if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
                embed.setDescription(`You don't have **\`${command.userPerms}\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`);
                return message.channel.send({ embeds: [embed] });
            }
        }
if (command.owner && message.author.id !== `${client.owner}`) {
            embed.setAuthor({ name: `|  Only Owner can use this command.`, iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.embedColor)
            return message.channel.send({ embeds: [embed] });
        }

        const player = message.client.manager.get(message.guild.id);
      
        if (command.player && !player) {
     embed.setAuthor({ name: `|  Nothing Playing Right Now.` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.embedColor)
            return message.channel.send({ embeds: [embed] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
           embed.setAuthor({ name: `|  You aren't connected a voice channel.` , iconURL:message.author.displayAvatarURL()})

    embed.setColor(client.embedColor)
return message.channel.send({ embeds: [embed] });

            return message.channel.send({ embeds: [embed] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
embed.setColor(client.embedColor);                     embed.setAuthor({ name: `| You must be in the same channel as me!`, iconURL:message.author.displayAvatarURL()});
                    return message.channel.send({ embeds: [embed] });
                }
            }
        }
    
        if (command.dj) {
            let data = await db2.findOne({ Guild: message.guild.id })
            let perm = 'MuteMembers';
            if (data) {
                if (data.Mode) {
                    let pass = false;
                    if (data.Roles.length > 0) {
                        message.member.roles.cache.forEach((x) => {
                            let role = data.Roles.find((r) => r === x.id);
                            if (role) pass = true;
                        });
                    };
                    if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setColor(client.embedColor),                   embed.setAuthor({ name: `| You don't have permission or dj role to use this command!`, iconURL:message.author.displayAvatarURL()})] })
                };
            };
        }
    if(command.voteonly){ 
  let vote = await topgg.hasVoted(message.author.id)
  
let premium = await npSchema.findOne({ Id: message.author.id });
         if(!'261553832549548032'.includes(message.author.id)  && !vote &&!premium){
let embed = new EmbedBuilder()
          .setColor(client.embedColor)
  .setAuthor({name:`|Vote required `,
      iconURL:message.author.displayAvatarURL()})
          .setDescription("Oops! You need to have voted for the bot in the last 12 hours to use that command, don't worry it's free and takes 20 seconds!")
          .addFields([{ name: 'Gain access to the command by voting',value: `[Here](https://top.gg/bot/1023571747133468703/vote)` }])
          const row = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()
    .setLabel("vote Me")
    .setStyle(ButtonStyle.Link)
    .setURL("https://top.gg/bot/1023571747133468703/vote"), 
    new ButtonBuilder()
    .setLabel("support server")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.gg/uYvTGBSrz6")
			);
          return message.channel.send({embeds: [embed], components: [row]})
        }
      }
        try {
            command.execute(message, args, client, prefix);
          const hook = new WebhookClient({ url: client.config.webhook.Cmd.url });
      if (hook) await hook.send({
        content: `\`[MSG]\` Ran: **${message.content}** | **${message.author.tag}** | **${message.guild?.name}** | **${message.channel?.name}**`
      });
        } catch (error) {
          console.log(error);
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
  };