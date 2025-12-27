const { EmbedBuilder, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
    name: "uptime",
    category: "Information",
    aliases: [ "up" ],
    description: "Uptime Of The Bot",
    args: false,
    usage: "",
    permission: ["SEND_MESSAGES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
const duration1 = moment.duration(message.client.uptime)
      .format(" d [days], h [hrs], m [mins], s [secs]");
      const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({ name: `| Uptime ${duration1} `, iconURL:message.author.displayAvatarURL()})
      message.channel.send({embeds: [embed]})
    }
}