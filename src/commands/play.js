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
	
function play(serv, message){
	serv.dispatcher = {};
	serv.currentlyPlayed = serv.songs.shift();
	if (!serv.currentlyPlayed){
		serv.playing = false;
		serv.currentlyPlayed = '';
		return 0;
	}
	
	serv.dispatcher = message.guild.voiceConnection.playStream(yt(serv.currentlyPlayed.url, { filter: 'audioonly' }), { seek: 1, passes: 4 });
	serv.dispatcher.on('end', () => {
		play(serv, message);
	});
	serv.dispatcher.on('error', (e) => {
		console.log(e);
		return message.channel.sendMessage('Shit happened.').then(() => {
			play(serv, message);
		});
	});
}
