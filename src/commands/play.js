const yt = require('ytdl-core');

let play = function(botto, message){
	console.log('5');
	let b = botto.guilds.get(message.guild.id).music;
	console.log('6');
	b.dispatcher = {};
	b.currentlyPlayed = b.songs.shift();
	console.log('7');
	console.log(b.currentlyPlayed);
	if (!b.currentlyPlayed){
		b.playing = false;
		b.currentlyPlayed = {};
		return 0;
	}
	console.log('8');
	let connect = b.voiceChannel;
	console.log('9');
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
	console.log('10');
	botto.guilds.get(message.guild.id).music.dispatcher = disp;
	console.log('11');
}

module.exports = {
	name: 'play',
	help: 'Start playing first song in list.',
	alias: [],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel.connection;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
		console.log('1');
		let g = bot.guilds.get(msg.guild.id).music;
		console.log('2');
		if(!g.songs[0]) return msg.channel.send('Nothing to play.');
		if(g.playing) return msg.channel.send("I'm already playing!!!");
		console.log('3');
		g.playing = true;
		console.log('4');
		play(bot, msg);
	}
}


