const yt = require('ytdl-core');

module.exports = {
	name: 'play',
	help: 'Start playing first song in list.',
	alias: [],
	run: (bot, msg) => {
		if(!msg.member.voiceChannel || !bot.guilds.get(msg.guild.id).music.voiceChannel) return msg.react('🔇');
		
		let g = bot.guilds.get(msg.guild.id).music;
		
		if(!g.songs[0]) return msg.channel.send('Nothing to play.');
		if(g.playing) return msg.channel.send("I'm already playing!!!");
		
		g.playing = true;
		
		play(g, msg);
	}
}
	
function play(g, msg){
	g.dispatcher = {};
	g.currentlyPlayed = g.songs.shift();
	if (!song){
		g.playing = false;
		g.currentlyPlayed = '';
		return;
	}
	
	g.dispatcher = msg.guild.voiceConnection.playStream(yt(g.currentlyPlayed.url, { filter: 'audioonly' }), { seek: 1, passes: 4 });
	g.dispatcher.on('end', () => {
		play(g, msg);
	});
	g.dispatcher.on('error', (e) => {
		console.log(e);
		return msg.channel.sendMessage('Shit happened.').then(() => {
			play(g, msg);
		});
	});
	
	console.log(bot.guilds.get(msg.guild.id).music);
}
