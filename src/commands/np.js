module.exports = {
	name: 'np',
	help: 'Check if bot is online.',
	alias: [],
	run: (bot, msg) => {
		if(!bot.guilds.get(msg.guild.id).music.playing) return msg.channel.send(`Nothing.`);
		let v = bot.guilds.get(msg.guild.id).music.currentlyPlayed;
		if(!v) return console.log('Error now playing.');
		
		msg.channel.send( {"embed": {
			"color": msg.member.displayColor || 'black',
			"title": v.title || 'No title',
			"thumbnail": { "url": v.thumbnail },
			"timestamp": v.date || 'No date',
			"author": { 
				"name": 'Currently playing:',
				"url": v.url || ""
			},
			"fields": [
				{ "name": "Duration",
				  "value": v.duration },
				{ "name": "Added by:",
				  "value": v.requester }
			]
		}} );
	}
}