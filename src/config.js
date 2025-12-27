require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "", //your bot token
    clientID: process.env.CLIENT_ID || "", // your bot client id
    prefix: process.env.PREFIX || "??", // bot prefix
    ownerID: process.env.OWNERID || "", //your discord id
    mongourl: process.env.MONGO_URI || "", // MongoDb URL
 // devID: process.env.DEV || "",
    embedColor: process.env.COlOR || ("FF0000"), // embed colour
    logs: process.env.LOGS || "1295097295116832798", // channel id for guild create and delete logs

  webhook: {
    Cmd: {
      url: 'https://discord.com/api/webhooks/1293947792284192950/3sS4d63EFDHcrMnAnta22xqby3lzWJoXi7wqOQl7opFMvJtZ1m43f6NgHi9Bc1NCc40G',
    },
    Errors: {
      url: 'https://discord.com/api/webhooks/1293946883441692764/Hm0ke2nERRXeSFWdChp00QPCfGj8QsJkTe_xmDKgx34luLCVMpI__efxcvVaiWd5svDP',
    },
    Loggin: {
      url: 'https://discord.com/api/webhooks/1324329336672620567/8eDS66DTWBm5gnadJBAhuPzZpwQONs1kKnstkXb8gVn9g7QDJtTs1Ucl3zfmzHYmcJLF',
    },
  },
  
 links: {
        support: process.env.SUPPORT || '', //support server invite link
        invite: process.env.INVITE || '' //bot invite link
  },
    nodes: [
      {
      host: process.env.NODE_HOST || "us31.glacierhosting.org",
            port: parseInt(process.env.NODE_PORT || "2003"),
            password: process.env.NODE_PASSWORD || "ankush",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),
        },
      {
      host: process.env.NODE_HOST || "us31.glacierhosting.org",
            port: parseInt(process.env.NODE_PORT || "2003"),
            password: process.env.NODE_PASSWORD || "ankush",
            secure: parseBoolean(process.env.NODE_SECURE || "false"),
}
  ],

}

function parseBoolean(value) {
    if (typeof (value) === 'string') {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
