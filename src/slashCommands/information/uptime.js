const { EmbedBuilder, CommandInteraction, Client } = require("discord.js")

module.exports = {
    name: "uptime",
    description: "Displays the bot's uptime.",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        await interaction.deferReply({
            ephemeral: false
        });
const duration1 = Math.round((Date.now() - interaction.client.uptime)/1000);
      const embed = new EmbedBuilder()
      embed.setColor(client.embedColor)
      embed.setDescription(`I am online from <t:${duration1}:R>`);
 
           interaction.editReply({ embeds: [embed]}); 
        }
    }
