const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      
  
  let embed = new EmbedBuilder()
     .setAuthor({ name: `| pong ${Math.round(client.ws.ping)}ms `, iconURL:message.author.displayAvatarURL()})
            .setColor(client.embedColor)
        const g = await message.channel.send({embeds: [embed]})
 }
}