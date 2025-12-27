const { EmbedBuilder } = require("discord.js");
module.exports = async (client, player) => {
try{
            player.message.delete()
        } catch(e)
        {
            
        }	
    const channel = client.channels.cache.get(player.textChannel);
        const thing = new EmbedBuilder()
        .setColor(client.embedColor)
		.setAuthor({name:`| Queue More songs and have fun and dont forget to vote`,
      iconURL: client.user.displayAvatarURL()});
    channel.send({embeds: [thing]});

    if (!player.twentyFourSeven) {
        
        await player.destroy();
      } else {
        
        await player.stop();
     }
}
