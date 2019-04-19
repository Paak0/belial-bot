module.exports = {
	name: 'np',
	help: 'Info about current playing song.',
	alias: [],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
		
		if(!bot.guilds.get(msg.guild.id).music.playing) return msg.channel.send(`Nothing.`);
		
		let v = bot.guilds.get(msg.guild.id).music.currentlyPlayed;
		if(!v) return console.log('Error now playing.');
		
		msg.channel.send( {"embed": {
			"color": msg.member.displayColor,
			"title": v.title,
			"thumbnail": { "url": v.thumbnail },
			"timestamp": v.date,
			"author": { 
				"name": 'Currently playing:',
				"url": v.url
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