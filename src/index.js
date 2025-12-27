const MusicBot = require("./structures/Client");
const client = new MusicBot();
const { EmbedBuilder, WebhookClient } = require("discord.js");
const hook = require("./config.js").webhook
const color = 'Red';
const channel = new WebhookClient({ url: hook.Errors.url });
const lund = new WebhookClient({ url: hook.Loggin.url });
const { inspect } = require('util')

process.removeAllListeners("warning");
process.on("unhandledRejection", async (err, promise) => {
  if (!String(err).includes("Unknown interaction") && !String(err).includes("Missing Access") && !String(err).includes("Missing Permissions") && !String(err).includes("Unknown Message")) {
  //  console.log(err, promise)
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('unhandledRejection')
      //.setDescription(`\`\`\`js\n${err}\`\`\``)
      .setDescription(`\`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`\n\n\n\`\`\`js\n${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``)
      .setTimestamp();
    return await channel.send({ embeds: [embed] });
  }
});
process.on("uncaughtException", async (err, promise) => {
  if (!String(err).includes("Unknown interaction") && !String(err).includes("Missing Access") && !String(err).includes("Missing Permissions") && !String(err).includes("Unknown Message")) {
    //console.log(err, promise)
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle('unhandledRejection')
      //.setDescription(`\`\`\`js\n${err}\`\`\``)
      .setDescription(`\`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\`\n\n\n\`\`\`js\n${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``)
      .setTimestamp();
    return await channel.send({ embeds: [embed] });
  }
});


client.connect()

module.exports = client; 

