const { Schema, model} = require('mongoose');

let CustomChannels = new Schema({
  ChannelId: {
    type: String,
  },
  GuildID: String,
});

module.exports = model('CustomChannels', CustomChannels);