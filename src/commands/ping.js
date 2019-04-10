module.exports = {
	name: 'ping',
	help: 'Check if bot is online.',
	alias: [],
	run: (bot, msg) => {
		console.log('pong');
		msg.channel.send(`${msg.author}, pong.`);
	}
}