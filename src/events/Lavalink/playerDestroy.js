const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require("discord.js");
const Model = require("../../schema/247");
const { Player } = require("erela.js");
const MusicBot = require("../../structures/Client");
const { AutoConnect } = require("../../utils/functions");

/**
 * 
 * @param {MusicBot} client 
 * @param {Player} player 
 * @returns 
 */

module.exports = async (client, player) => {
try{
            player.message.delete()
        } catch(e)
        {
            
        }	
	//client.logger.log(`Player has been destroyed in ${player.guild}`, "log");

  const twentyFourSeven = await Model.findOne({ Guild: player.guild, TextChannel: player.textChannel, 247: true });

	if (twentyFourSeven) {
		const obj = {
			guild: player.guild,
			voicechannel: twentyFourSeven.VoiceChannel,
			textchannel: player.textChannel,
			status: true,
		}

		await AutoConnect(obj, client);

		const channel = client.channels.cache.get(player.textChannel); 
  
    
		 return;

    }
}