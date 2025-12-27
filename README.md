# 🎵 Resso - Advanced Discord Music Bot

<div align="center">

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org)
[![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-ISC-orange.svg)](LICENSE)

*A powerful, feature-rich Discord music bot with advanced filters and multi-platform support*

**Developed by EliteX Development**

</div>

---

## ✨ Features

### 🎶 Music Playback
- **Multi-Platform Support**: Spotify, Deezer, Apple Music, Facebook, and more
- **High-Quality Audio**: Powered by Lavalink for crystal-clear sound
- **Queue Management**: Add, remove, skip, shuffle, and manage your music queue
- **24/7 Mode**: Keep the bot in your voice channel continuously
- **Auto-play**: Automatically play similar songs when queue ends

### 🎚️ Audio Filters
- **8D Audio**: Immersive surround sound experience
- **Nightcore**: Speed up and pitch up your music
- **Vaporwave**: Slow down for that retro aesthetic
- **Bass Boost**: Enhanced bass levels
- **Speed & Pitch Control**: Fine-tune playback speed and pitch
- **Equalizer**: Custom 15-band equalizer
- **Distortion**: Add distortion effects

### 🎛️ Advanced Features
- **DJ Role System**: Restrict music controls to specific roles
- **Custom Prefix**: Set unique prefixes per server
- **Playlist System**: Create, save, and load personal playlists
- **Vote System**: Democratic song skipping
- **Now Playing**: Interactive now-playing messages with controls
- **Search**: Search for songs across multiple platforms
- **Seek**: Jump to any point in the track

### 🛠️ Technical Features
- **Sharding Support**: Scalable for large bot deployments
- **MongoDB Integration**: Persistent data storage
- **Error Handling**: Comprehensive error logging via webhooks
- **Slash Commands**: Modern Discord slash command support
- **Permission System**: Role-based command restrictions

---

## 📋 Requirements

Before setting up the bot, ensure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org))
- **MongoDB** database ([MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas) or local installation)
- **Lavalink Server** ([Setup Guide](https://github.com/freyacodes/Lavalink))
- **Discord Bot Token** ([Discord Developer Portal](https://discord.com/developers/applications))

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/alone4sure/music-bot-v1
cd Resso
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Bot Configuration
TOKEN=your_discord_bot_token_here
CLIENT_ID=your_bot_client_id_here
PREFIX=?
OWNERID=your_discord_user_id_here

# Database
MONGO_URI=your_mongodb_connection_string_here

# Bot Settings
COLOR=FF0000
LOGS=channel_id_for_logs

# Links (Optional)
SUPPORT=https://discord.gg/your-support-server
INVITE=https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot

# Lavalink Node Configuration
NODE_HOST=us31.glacierhosting.org
NODE_PORT=2003
NODE_PASSWORD=ankush
NODE_SECURE=false
```

### 4. Configure Webhooks (Optional)

In [src/config.js](src/config.js), update the webhook URLs for error logging:

```javascript
webhook: {
  Cmd: {
    url: 'your_command_webhook_url',
  },
  Errors: {
    url: 'your_error_webhook_url',
  },
  Loggin: {
    url: 'your_logging_webhook_url',
  },
},
```

### 5. Setup Lavalink Server

#### Option A: Use Existing Lavalink Server
The bot is pre-configured with a Lavalink node. You can use it or configure your own in [src/config.js](src/config.js).

#### Option B: Host Your Own Lavalink Server
1. Download Lavalink from [here](https://github.com/freyacodes/Lavalink/releases)
2. Create an `application.yml` file:
```yaml
server:
  port: 2333
  address: 0.0.0.0
lavalink:
  server:
    password: "youshallnotpass"
    sources:
      youtube: true
      bandcamp: true
      soundcloud: true
      twitch: true
      vimeo: true
      http: true
      local: false
    bufferDurationMs: 400
    frameBufferDurationMs: 5000
    youtubePlaylistLoadLimit: 6
    playerUpdateInterval: 5
    youtubeSearchEnabled: true
    soundcloudSearchEnabled: true
    gc-warnings: true
```
3. Run Lavalink: `java -jar Lavalink.jar`
4. Update the node configuration in [src/config.js](src/config.js)

### 6. Setup MongoDB

#### Option A: MongoDB Atlas (Cloud - Free)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier available)
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
5. Get your connection string and add it to `.env`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/resso`

### 7. Bot Permissions

When inviting the bot to your server, ensure it has these permissions:
- Read Messages/View Channels
- Send Messages
- Embed Links
- Attach Files
- Read Message History
- Add Reactions
- Use External Emojis
- Connect (Voice)
- Speak (Voice)
- Use Voice Activity
- Manage Channels (for 24/7 mode)

**Recommended**: Use Administrator permission for full functionality.

---

## ▶️ Running the Bot

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The bot will:
1. Connect to MongoDB
2. Initialize Lavalink connection
3. Load all commands and events
4. Login to Discord
5. Display ready message with server count

---

## 📁 Project Structure

```
Resso/
├── src/
│   ├── commands/          # Command modules
│   │   ├── Config/        # Bot configuration commands
│   │   ├── filters/       # Audio filter commands
│   │   ├── information/   # Info commands
│   │   ├── Music/         # Music playback commands
│   │   ├── Owner/         # Owner-only commands
│   │   └── Playlist/      # Playlist management
│   ├── events/            # Event handlers
│   │   ├── Client/        # Discord client events
│   │   └── Lavalink/      # Lavalink player events
│   ├── handlers/          # Command & event loaders
│   ├── schema/            # MongoDB schemas
│   ├── slashCommands/     # Slash command modules
│   ├── structures/        # Core bot structures
│   ├── utils/             # Utility functions
│   ├── config.js          # Bot configuration
│   └── index.js           # Main bot file
├── sharder.js             # Sharding manager
├── package.json           # Dependencies
└── .env                   # Environment variables
```

---

## 🎮 Commands

### Music Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `play` | Play a song from any platform | `?play <song name or URL>` |
| `pause` | Pause the current song | `?pause` |
| `resume` | Resume playback | `?resume` |
| `skip` | Skip to next song | `?skip` |
| `stop` | Stop music and clear queue | `?stop` |
| `queue` | View current queue | `?queue` |
| `nowplaying` | Show current song info | `?nowplaying` |
| `shuffle` | Shuffle the queue | `?shuffle` |
| `loop` | Toggle loop mode | `?loop [queue/song]` |
| `volume` | Set volume (0-100) | `?volume <number>` |
| `seek` | Seek to timestamp | `?seek <time>` |
| `autoplay` | Toggle autoplay | `?autoplay` |

### Filter Commands
| Command | Description |
|---------|-------------|
| `8d` | Toggle 8D audio effect |
| `bassboost` | Toggle bass boost |
| `nightcore` | Toggle nightcore effect |
| `vaporwave` | Toggle vaporwave effect |
| `speed` | Adjust playback speed |
| `pitch` | Adjust audio pitch |
| `equalizer` | Configure equalizer |
| `clear` | Clear all filters |

### Playlist Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `create` | Create new playlist | `?create <name>` |
| `delete` | Delete a playlist | `?delete <name>` |
| `savecurrent` | Save current song to playlist | `?savecurrent <playlist>` |
| `savequeue` | Save entire queue to playlist | `?savequeue <playlist>` |
| `load` | Load a playlist | `?load <name>` |
| `list` | Show your playlists | `?list` |

### Config Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `247` | Toggle 24/7 mode | `?247` |
| `adddj` | Add DJ role | `?adddj <role>` |
| `removedj` | Remove DJ role | `?removedj <role>` |
| `setprefix` | Change server prefix | `?setprefix <prefix>` |
| `setchannel` | Set music channel | `?setchannel` |

### Information Commands
| Command | Description |
|---------|-------------|
| `help` | Show all commands |
| `about` | About the bot |
| `ping` | Check bot latency |
| `stats` | Bot statistics |
| `invite` | Get bot invite link |
| `support` | Support server link |

---

## 🔧 Configuration

### Adding More Lavalink Nodes

Edit [src/config.js](src/config.js):
```javascript
nodes: [
  {
    host: "your-lavalink-host.com",
    port: 2333,
    password: "your-password",
    secure: false, // true for https
  },
  // Add more nodes here
]
```

### Customizing Bot Presence

Edit [src/structures/Client.js](src/structures/Client.js):
```javascript
presence: {
  status: "idle", // online, idle, dnd, invisible
}
```

### Adjusting Shards

Edit [sharder.js](sharder.js):
```javascript
totalShards: 1, // Increase for larger bots
```

---

## 🛡️ Important Notes

### YouTube Restrictions
⚠️ **Note**: Direct YouTube URL playback is disabled in this bot to comply with Discord's Terms of Service. Users should use search queries instead, which utilize the default streaming system.

### Database Collections
The bot uses these MongoDB collections:
- `247` - 24/7 mode settings
- `dj` - DJ role configurations
- `prefix` - Custom server prefixes
- `playlist` - User playlists
- `customChannel` - Music channel settings
- `bot` - Bot statistics

---

## 🐛 Troubleshooting

### Bot doesn't play music
- Ensure Lavalink server is running and accessible
- Check node configuration in config.js
- Verify bot has Connect and Speak permissions

### Database connection fails
- Verify MongoDB URI is correct
- Check if IP is whitelisted (MongoDB Atlas)
- Ensure MongoDB service is running

### Commands not working
- Check bot has necessary permissions
- Verify prefix is correct (`?` by default)
- Ensure command files are properly loaded

### Bot goes offline unexpectedly
- Check error webhooks for logs
- Verify token is valid
- Review console for error messages

---

## 📝 Development

### Adding New Commands

1. Create a new file in `src/commands/<category>/commandname.js`:
```javascript
module.exports = {
  name: "commandname",
  category: "Music",
  aliases: ["alias1"],
  description: "Command description",
  args: false,
  usage: "",
  userPerms: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    // Command logic here
  }
};
```

2. The command will be automatically loaded on restart

### Adding Events

1. Create event file in `src/events/Client/` or `src/events/Lavalink/`
2. Export with `name` and `run` function
3. Handler will automatically load it

---

## 📜 License

This project is licensed under the ISC License.

---

## 🤝 Support & Community

- **Support Server**: [Join our Discord](https://discord.gg/your-support-server)
- **Issues**: Report bugs on GitHub Issues
- **Contributions**: Pull requests are welcome!

---

## ⚡ Credits

**Developed by EliteX Development**

Built with:
- [Discord.js](https://discord.js.org) - Discord API wrapper
- [Erela.js](https://github.com/MenuDocs/erela.js) - Lavalink client
- [Lavalink](https://github.com/freyacodes/Lavalink) - Audio player
- [MongoDB](https://www.mongodb.com) - Database

---

## 📸 Screenshots

### Now Playing Interface
Interactive music controls with real-time updates

### Queue Management
Comprehensive queue display with track information

### Filter Controls
Easy-to-use audio filter commands

---

## 🔐 Security

- Never commit your `.env` file
- Keep your bot token private
- Regularly update dependencies
- Use strong MongoDB passwords
- Restrict owner commands to your user ID only

---

## 📊 Performance

- Supports multiple servers with sharding
- Optimized database queries
- Efficient memory management
- Fast command response times
- Minimal latency audio playback

---

<div align="center">

**Made with ❤️ by EliteX Development**

⭐ Star this repo if you find it helpful!

</div>
