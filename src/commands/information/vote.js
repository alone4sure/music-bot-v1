const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "vote",
    category: "Information",
    aliases: [ "vote" ],
    description: "To get information about this bot!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("vote me")
          .setStyle(ButtonStyle.Link)
          .setURL("https://top.gg/bot/1023571747133468703"),
        new ButtonBuilder()
          .setLabel("Support")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.gg/uYvTGBSrz6")
      );

    const mainPage = new EmbedBuilder()
    .setColor(client.embedColor)
      
      .setAuthor({name:`| Enjoying music with Resso help me by vote here  `,
      iconURL: message.author.displayAvatarURL()})

      return message.channel.send({embeds: [mainPage], components: [row]})

    } 
    }