const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/customChannel");

module.exports = {
    name: "setchannel",
    category: "Config",
    description: "Sets the DJ role.",
    args: false,
    usage: "",
    aliases: ["setch"],
    userPerms: ['ManageGuild'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });

         let role = message.mentions.channels.first();

      if(!args[0]){
     return message.channel.send({embeds : [new EmbedBuilder()        .setColor(client.embedColor)
        .setAuthor({ name: `| Invalid command.\nValid commands: add, remove`,
                  iconURL:message.author.displayAvatarURL()})]})
      }

    let opt = args[0].toLowerCase();

    if(opt === `add`)
    {
      let u = message.mentions.channels.first();
      if(!u) { return message.channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: `| SetChannel tips`, iconURL:message.author.displayAvatarURL()})
 .setColor(client.embedColor).setDescription(`
**Description**, Bot's Main Commands Channel

1). **How To Set Channel ?**, ${prefix}setchannel add #channel

2). **How To Reset Channel ?**, ${prefix}setchannel remove #channel 
          `)                               .setColor(client.embedColor)] })}

      if (!data) {
    data = new db({
        ChannelId: message.channel.id,
        GuildID: message.guild.id,
      });
            await data.save();
            return message.channel.send({ embeds: [new EmbedBuilder().setAuthor({ name: `| Setchannel added.`, iconURL:message.author.displayAvatarURL()})                                  .setDescription (`Successfully set the text channel `).setColor(client.embedColor)] })
        } else return message.channel.send({ embeds: [new EmbedBuilder()
        .setAuthor({ name: `| The text channel is already set.`,                iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
    } 
      if(opt === `remove`)
    {
      let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.channel.send({ embeds: [new EmbedBuilder()
        .setAuthor({ name: `| Successfully reset the text channel`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
        } else return message.channel.send({ embeds: [new EmbedBuilder()
        .setAuthor({ name: `| There is no text channel set for this server.`,
                  iconURL:message.author.displayAvatarURL()}).setColor(client.embedColor)] })
    }
    }
                                                      }