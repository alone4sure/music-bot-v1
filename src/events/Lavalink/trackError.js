const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, track, payload) => {

try{
            player.message.delete()
        } catch(e)
        {
            
        }
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new EmbedBuilder()
        .setColor(client.embedColor)
		.setAuthor({name:`| Error when loading song! Track is error`,
      iconURL: client.user.displayAvatarURL()});
    channel.send({embeds: [thing]});
   player.destroy();

}
