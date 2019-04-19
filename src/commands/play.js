const yt = require('ytdl-core');

let play = function(botto, message){
	let b = botto.guilds.get(message.guild.id).music;
	b.dispatcher = {};
	b.currentlyPlayed = b.songs.shift();
	if (!b.currentlyPlayed){
		b.playing = false;
		b.currentlyPlayed = {};
		return 0;
	}
	let connect = b.voiceChannel;
	let disp = connect.playStream(yt(b.currentlyPlayed.url, { filter: 'audioonly' }), { seek: 0 });
	disp.on('end', () => {
		play(botto, message);
	});
	disp.on('error', (e) => {
		console.log(e);
		return message.channel.sendMessage('Shit happened.').then(() => {
			play(botto, message);
		});
	});
	botto.guilds.get(message.guild.id).music.dispatcher = disp;
}

module.exports = {
	name: 'play',
	help: 'Start playing first song in list.',
	alias: [],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel.connection;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
			
		let g = bot.guilds.get(msg.guild.id).music;
		
		if(!g.songs[0]) return msg.channel.send('Nothing to play.');
		if(g.playing) return msg.channel.send("I'm already playing!!!");
		
		g.playing = true;
		
		play(bot, msg);
	}
}


