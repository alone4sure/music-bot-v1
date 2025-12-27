const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme"],
  description: "Get the bot's invite link.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  execute: async (message, args, client, prefix) => {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`));
        
    const mainPage = new EmbedBuilder()
.setAuthor({name:`| Invite link `,
      iconURL:client.user.displayAvatarURL()})

    .setColor(client.embedColor)
            .setDescription(`Thanks, for giving an invite. Just [Click Me](${client.config.links.invite}) or click the below button to help me reach your server.`)
    message.channel.send({ embeds: [mainPage], components: [row] })
  }
}
