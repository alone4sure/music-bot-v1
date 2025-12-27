const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "about",
    category: "Information",
    aliases: [ "ab" ],
    description: "To get information about this bot!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
   let dev = [],            
      user = await client.users.fetch(`261553832549548032`);//marlega
            dev.push(`[${user.username}](https://discord.com/users/261553832549548032)`);
              let editEmbed = new ActionRowBuilder();  
const row = new ActionRowBuilder()
			.addComponents(
    new ButtonBuilder()
    .setLabel("Invite")
    .setStyle(ButtonStyle.Link)
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
        new ButtonBuilder()
    .setLabel("vote Me")
    .setStyle(ButtonStyle.Link)
    .setURL("https://top.gg/bot/1023571747133468703/vote"), 
    new ButtonBuilder()
    .setLabel("Support")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.gg/uYvTGBSrz6"),
			);
      const mainPage = new EmbedBuilder()
        .setAuthor({name:`| About ${client.user.username} `,
      iconURL:client.user.displayAvatarURL()})
        .setThumbnail(client.user.displayAvatarURL())
    .setColor(client.embedColor)
    .setDescription (`**Hey, I'm ${client.user.username}. My work is to play Music. You can view all my commands by typing \`${prefix}help\`.**`)
    .setFooter({text : `Developed with ❤️ By - !        𝐀𝐚𝐲𝐮𝐬𝐡..!🚬#6997`})
    .addFields([
                {name: `**__Developer__**`, value: dev.join(`, `) } ])
      
        
      return message.channel.send({embeds: [mainPage], components: [row]})
    }
}