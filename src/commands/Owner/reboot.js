const chalk = import('chalk');

module.exports = {
    name: "reboot",
    category: "Owner",
    description: "Leave server",
    args: false,
    usage: "<guild id>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        
        console.log(chalk.red(`[CLIENT] Restarting...`));
            
    setTimeout(() => {
          process.exit();
        }, 2000);
                message.reply(`I am resting my self`);
    },
};