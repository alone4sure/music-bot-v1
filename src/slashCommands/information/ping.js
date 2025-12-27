const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Displays the bot's ping.",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: true
        });
           const api_ping = client.ws.ping;
      
      const embed = new EmbedBuilder()
               .setColor(client.embedColor)
    
    
.setAuthor({name:`| Ping ${api_ping}ms `,
      iconURL: interaction.member.user.displayAvatarURL({ dynamic: true})});
 
           interaction.editReply({ embeds: [embed]}); 
        }
    }
