const { EmbedBuilder, version, Message } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");
const MusicBot = require("../../structures/Client");
const config = require("../../config.js");
const db = require("../../schema/Bot");

module.exports = {
  name: "stats",
  category: "Information",
  aliases: ["st"],
  description: "Displays bot status.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  /**
   *
   * @param {Message} message
   * @param {string[]} args
   * @param {MusicBot} client
   * @param {string} prefix
   */
  execute: async (message, args, client, prefix) => {
    const duration1 = moment
    .duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
 let connectedchannelsamount = 0;
            let guilds = client.guilds.cache.map((guild) => guild);
            for (let i = 0; i < guilds.length; i++) {
                if (guilds[i]. members.me.voice.channel) connectedchannelsamount += 1;
            }
            if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
    const data = await db.findOne({ id: client.user.id });
    
            let dev = [], cdev = [], supp =[];
            let user = await client.users.fetch(`261553832549548032`);//aj
            dev.push(`[${user.username}](https://discord.com/users/261553832549548032)`);
 //   user = await client.users.fetch(`737876938701668372`);//pratiyush 
      //      dev.push(`[${user.username}](https://discord.com/users/737876938701668372)`);
            //    user = await client.users.fetch(``);//pos
      //      supp.push(`[${user.username}](https://discord.com/users/909837635000864778)`);
       const statsEmbed = new EmbedBuilder()
			      .setColor(client.embedColor)
              .setAuthor({ name: `| Resso information `, iconURL:message.author.displayAvatarURL()})
         .setThumbnail(client.user.displayAvatarURL())
           .setTimestamp()
         .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})     
              .setDescription(`**Playing arround 
• Guilds: ${client.guilds.cache.size}\n• Users: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\n• Channels: ${client.channels.cache.size}\n• Connections: ${connectedchannelsamount}                          

Memories
• Total Memory : ${(os.totalmem() / 1024 / 1024).toFixed(
        2
      )}mb 
• Free Memory : ${(os.freemem() / 1024 / 1024).toFixed(
        2
      )}mb
• Heap Total : ${(
          process.memoryUsage().heapTotal /
          1024 /
          1024
        ).toFixed(2)}mb
• Heap Usage : ${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)}mb

host status 
• Platfrom : ${os.type}
• Cores : ${os.cpus().length}
• Model: ${os.cpus()[0].model} 
• Speed: ${os.cpus()[0].speed} MHz  

Bot info
• Discord.js : v${version}
• Node : ${process.version}
• Bot ping : ${Math.round(client.ws.ping)}ms 
• Uptime : ${duration1}**`)              .addFields([
                {name: `**__Developers__**`, value: dev.join(`, `) }, 
              ])
            message.channel.send({embeds: [statsEmbed]});
  },
};