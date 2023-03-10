const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
require("dotenv/config");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});

const messageTimes = [
	"11:45 AM",
	"2:45 PM",
	"5:45 PM",
	"8:45 PM",
	"11:45 PM",
	"2:45 AM",
	"5:45 AM",
	"8:45 AM",
	"11:45 AM",
];

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity("!wg for next match", {
		type: ActivityType.Listening,
	});
});

client.on("messageCreate", (message) => {
	if (message.content.toLowerCase() === "!wg") {
		const now = new Date();

		const detroitTimezone = new Intl.DateTimeFormat("en-US", {
			timeZone: "America/Detroit",
		});
		let nextMessageTime = null;

		for (const time of messageTimes) {
			const messageDate = new Date(
				`${detroitTimezone.format(now)} ${time}`
			);

			if (messageDate > now) {
				nextMessageTime = messageDate;
				break;
			}
		}

		if (!nextMessageTime) {
			nextMessageTime = new Date(
				`${detroitTimezone.format(now)} ${messageTimes[0]}`
			);
		}

		nextMessageTime.setMinutes(nextMessageTime.getMinutes() + 135);
		const timeUntilNextMessage = nextMessageTime - now;
		const hours = Math.floor(timeUntilNextMessage / (60 * 60 * 1000));
		const minutes = Math.floor(
			(timeUntilNextMessage % (60 * 60 * 1000)) / (60 * 1000)
		);

		message.reply(
			`Wintergrasp starts in ${hours} hour(s) and ${minutes} minute(s).`
		);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
