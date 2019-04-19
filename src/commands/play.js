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
		
		play(bot, msg);
	}
}

function play(botto, message){
	let b = botto.guilds.get(msg.guild.id).music;
	b.dispatcher = {};
	b.currentlyPlayed = b.songs.shift();
	if (!b.currentlyPlayed){
		b.playing = false;
		b.currentlyPlayed = '';
		return 0;
	}
	
	b.dispatcher = message.guild.voiceConnection.playStream(yt(b.currentlyPlayed.url, { filter: 'audioonly' }), { seek: 1, passes: 4 });
	b.dispatcher.on('end', () => {
		play(botto, message);
	});
	b.dispatcher.on('error', (e) => {
		console.log(e);
		return message.channel.sendMessage('Shit happened.').then(() => {
			play(botto, message);
		});
	});
}
