const config = require('../config.js');
const ytToken = config.yt || process.env.YT_KEY;
const YTB = require('simple-youtube-api');
const youtube = new YTB(ytToken);
const yt = require('ytdl-core');

let reactions = [
	'1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣'
]

module.exports = {
	name: 'add',
	help: 'Add song to list.',
	alias: [],
	run: async (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
		
		let words = msg.content.split(' ');
		if(!words[1]) return msg.channel.send('Huh?');
		
		let searchString = words.slice(1).join(' ');
		let songIndex = 0;
		
		let videos = await youtube.searchVideos(searchString, 8)
		.catch( e => { return console.log(e) });
		
		msg.channel.send(`\`\`\`
Choose song: ${videos.map( (vid, index) => `\n${++index}. ${vid.title}`)}
\`\`\``).then( async m => {
			await m.react("\u0031\u20E3");
			await m.react("\u0032\u20E3");
			await m.react("\u0033\u20E3");
			await m.react("\u0034\u20E3");
			await m.react("\u0035\u20E3");
			await m.react("\u0036\u20E3");
			await m.react("\u0037\u20E3");
			await m.react("\u0038\u20E3");
			
			const collector = m.createReactionCollector( ( r, u ) => reactions.includes(r.emoji.name) && u.id === msg.author.id, { maxUsers: 1, maxEmojis: 1, time: 15000 })
			collector.on('collect', e => {
				songIndex = e.emoji.name[0];
			});
			collector.on('end', e => {
				m.delete();
				
				if(!songIndex) return msg.react('❌');
				
				let v = videos[songIndex - 1];
				let vidTitle = v.title;
				
				yt.getInfo(v.url, [], (err, info) => {
					if(err) return msg.channel.send('I can\'t use this link.');
					if(info.length_seconds > 420) return msg.channel.send('7min is my limit. Looks like i can\'t please you.');
					
					let songDuration = Math.floor(info.length_seconds/60)+':'+info.length_seconds%60 || '---';
					let song = {url: v.url, title: vidTitle, thumbnail: v.thumbnails.high.url, date: v.publishedAt, duration: songDuration, requester: msg.author.username};
					bot.guilds.get(msg.guild.id).music.songs.push( song );
					msg.channel.send( {"embed": {
						"color": msg.member.displayColor,
						"title": vidTitle,
						"thumbnail": { "url": v.thumbnails.high.url },
						"timestamp": v.publishedAt,
						"author": {
							"name": "Added:",
							"url": v.url
						},
						"fields": [
							{ "name": "Duration",
							  "value": songDuration }
						]
					}} );
				});
			});
		})
		.catch( e => {
			console.log(e);
			return msg.channel.send(`You were expecting a song, but it\'s me, Error.`);
		});
	}
}