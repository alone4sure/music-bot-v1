const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "support",
  category: "Information",
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Support server")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.gg/uYvTGBSrz6`));
        
    const mainPage = new EmbedBuilder()
.setAuthor({name:`| Support server link `,
      iconURL:client.user.displayAvatarURL()})

    .setColor(client.embedColor)
            .setDescription(`Thanks, for giving an invite. Just [Click Me](${client.config.links.support}) or click the below button to reach your destination.`)
    message.channel.send({ embeds: [mainPage], components: [row] })
  }
}
