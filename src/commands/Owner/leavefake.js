const chalk = import ('chalk');

module.exports = {
    name: "leavefake",
    category: "Owner",
    description: "Leave server",
    args: false,
    usage: "<guild id>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
      
            
let filter = client.guilds.cache.filter(g => g.memberCount < 35) 
filter.map(g=>g.leave())

                message.reply(`I am resting my self`);
    },
};