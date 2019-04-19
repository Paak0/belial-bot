module.exports = {
	name: 'help',
	help: 'Check if bot is online.',
	alias: [],
	run: (bot, msg) => {
		msg.channel.send(`${bot.commands.map( c => '\n'+c.name )}`);
	}
}