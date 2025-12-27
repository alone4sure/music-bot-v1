const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["j"],
  category: "Music",
  description: "Summons the bot to your voice channel.",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    
    let player = message.client.manager.get(message.guildId);
        if(player && player.voiceChannel && player.state === "CONNECTED") {
            return await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name:`| Somebody already using me.`,
      iconURL: message.author.displayAvatarURL()})
                                        .setColor(client.embedColor)
]})  
        
        } else {
    if (!message.guild.members.me.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) return message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| No permission `,
      iconURL: message.author.displayAvatarURL()}).setDescription(`I am have not enough permission to execute this command`)
          ]});

    const { channel } = message.member.voice;
   
    if (!message.guild.members.me.permissionsIn(channel).has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) return message.channel.send({embeds: [new EmbedBuilder().setColor(client.embedColor).setAuthor({name:`| No permission to speak`,
      iconURL: message.author.displayAvatarURL()}).setDescription(`I don't have enough permissions to connect to your VC! Please give me permission to \`CONNECT\` or \`SPEAK\`.`)
       .setThumbnail(message.author.displayAvatarURL()) 
        .setTimestamp()
    .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}) ]});
  

     player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 100,
        selfDeafen: true,
      }) 
      if(player && player.state !== "CONNECTED") player.connect();

      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
          .setAuthor({name:`| Successfully joined `,
      iconURL: message.author.displayAvatarURL()})
        
      return message.channel.send({ embeds: [thing] });

    };
  }
};