const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// CHANNEL ID 
const TARGET_CHANNEL_ID = "ENTER_YOUR_PROMO_CHANNEL_ID";

// PING SOMEONE LIKE @bone
const TARGET_USER_ID = "ENTER_YOUR_PING_ID";

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    // ONLY ONE CHANNEL
    if (message.channel.id !== TARGET_CHANNEL_ID) return;

    let found = false;

    // MESSAGE CONTROL
    if (
        message.content.toLowerCase().includes("discord.gg/store") ||
        message.content.toLowerCase().includes("promos.discord.gg") ||
        message.content.toLowerCase().includes("store")
    ) {
        found = true;
    }

    // EMBED CONTROL
    if (message.embeds.length > 0) {
        for (const embed of message.embeds) {
            if (
                (embed.url && embed.url.includes("store")) ||
                (embed.description && embed.description.toLowerCase().includes("store")) ||
                (embed.title && embed.title.toLowerCase().includes("store"))
            ) {
                found = true;
            }
        }
    }

    if (found) {
        message.channel.send(`<@${TARGET_USER_ID}> FOUND A PROMO CODE`);
    }
});

client.login("ENTER_YOUR_TOKEN_HERE");
