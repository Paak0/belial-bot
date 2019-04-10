module.exports = {
	name: 'ping',
	help: 'Check if bot is online.',
	run: (bot, msg) => {
		msg.channel.send(`Pong.`);
	}
}