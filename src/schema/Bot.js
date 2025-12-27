const { Schema, model } = require("mongoose");

module.exports = model(
    "Bot",
    new Schema({
        id: { type: String },
        userName: { type: String, required: true },
        commandsRan: { type: String, default: "0" },
        songsRan: { type: String, default: "0" },
    })
);
