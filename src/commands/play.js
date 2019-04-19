const yt = require('ytdl-core');

module.exports = {
	name: 'play',
	help: 'Start playing first song in list.',
	alias: [],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
			
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
	if (!g.currentlyPlayed){
		g.playing = false;
		g.currentlyPlayed = '';
		return 0;
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
}
