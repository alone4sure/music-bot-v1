const { prefix } = require("../../config.js");
const { Activity } = require("discord.js");
const PremiumUser = require("../../schema/PremiumUser");
module.exports ={
name: "ready",
run: async (client) => {
    client.manager.init(client.user.id);
    client.logger.log (`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, "ready");

//  const users = await User.find();
//  users.forEach((user) => client.Premiums.set(user.Id, user));

  
 }
}