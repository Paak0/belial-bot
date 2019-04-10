module.exports = {
	name: 'servers',
	help: 'List of servers abused by Belial.',
	alias: [],
	run: (bot, msg) => {
		return msg.channel.send(`Belial is currently invading ${bot.guilds.size} servers:\n${bot.guilds.map( g => '- '+g.name )}`);
	}
}