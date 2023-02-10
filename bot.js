const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
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

		nextMessageTime.setMinutes(nextMessageTime.getMinutes() + 15);
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

client.login(
	"MTA3MzY2MzQ3OTM3MTc5NjU4MA.GT_44A.y-mWMHQx7nK_o0YGqsmhSs9IpdUWUpQxOm7u3I"
);
