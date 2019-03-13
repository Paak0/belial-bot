const config = require('./config.js');
const ytToken = config.yt || process.env.YT_KEY;
const request = require('superagent');
const fetch = require('node-fetch');
const Jimp = require('jimp');
const belial = require('./belial.js');
const YTB = require('simple-youtube-api');
const youtube = new YTB(ytToken);
const yt = require('ytdl-core');


module.exports = {
	
	'temp': {
		name: '',
		desc: '',
		dothis: function(msg){
			
		}
	},
	
	'ping': {
		name: 'ping',
		desc: 'Ping me to see if i am alive.',
		dothis: function(msg){
			
		}
	},
	
	'random': {//done
		name: 'random',
		desc: 'Get random number. [default 0-10]',
		dothis: function(msg){
			let args = msg.content.split(' ');
			let min = args.length > 2 && !isNaN( Number(args[1]) ) ? parseInt(args[1]) : 0;
			let max = !isNaN( Number(args[2]) ) || !isNaN( Number(args[1]) ) ? parseInt(args[2]) || parseInt(args[1]) : 11;
			let randomNumber = Math.floor( Math.random()*(max - min) + min );
			msg.channel.send(`Your number: ${randomNumber}`);
		}
	},
	
	'avatar': {//done
		name: 'avatar',
		desc: 'Show avatar.',
		dothis: function(msg){
			let user = msg.mentions.users.first() || msg.author || 0;
			if(!user) return;
			msg.channel.send( {'embed':{ 'image':{ 'url': user.displayAvatarURL } } } );
			
			if( user.username != 'Belial' && Math.random() < 0.4 ){
				let randomNumber = Math.floor( Math.random() * belial.messages.length );
				msg.channel.send(  user +' '+ belial.messages.find( (elem, index) => { return index === randomNumber; } ) );
			}
		}
	},
	
	'info': {
		name: 'info',
		desc: 'User informations.',
		dothis: function(msg){
			let mbr = msg.mentions.members.first() || msg.member || 0;
			if(!mbr) return;
			msg.channel.send( {"embed": {
				"color": mbr.displayColor,
				"thumbnail": { "url": mbr.user.displayAvatarURL },
				"author": { "name": mbr.user.username },
				"fields": [
					{	"name": "ID",
						"value": mbr.user.id },
					{	"name": "Status",
						"value": mbr.user.presence.status },
					{	"name": "Nickname",
						"value": mbr.nickname || "none" },
					{	"name": "Account created",
						"value": mbr.user.createdAt },
					{	"name": "Joined guild",
						"value": mbr.joinedAt },
					{	"name": "Roles",
						"value": "soonTM" }
				]
			}}).catch( e => { return console.log(e.stack); } );
		}
	},
	
	'slap': {//done
		name: 'slap',
		desc: 'Slap someone',
		dothis: function(msg){
			let mention = msg.mentions.users.first() || null;
			if(!mention) return msg.reply(`You just wasted 1 slap. Think about your existance. ${bot.emojis.find(emoji => emoji.name === 'kannaangry2')}`);
				
			let bg = 'https://i.imgur.com/1wevUnK.jpg';
			let img1 = msg.author.displayAvatarURL;
			let img2 = mention.displayAvatarURL;
			Jimp.read(img2).then( function(front2){
				front2.rotate(30);
				front2.resize(120, 120);
				Jimp.read(img1).then( function(front1){
					front1.resize(100, 100);
					Jimp.read(bg).then( function(back){
						back.composite(front2, 60, 280).composite(front1, 220, 140).getBuffer(Jimp.MIME_JPEG, (e, buffer) => {
							if(e) return console.log(e.stack);
							msg.channel.send({ files: [{ attachment: buffer, name: 'slapped.jpg' }] }).then( () => {
								if(mention.username === 'Belial') msg.channel.send(`MY INNER MASOCHISM IS SCREAMING!!!\nUHOOHOHOHOHOHOOOHOOOOOO!!!`);
							});;
						});
					});
				});
			});
		}
	},
	
	'join': {
		name: 'join',
		desc: 'Join to voice channel.',
		dothis: function(msg, s){
			if(!s) s = { name: msg.guild.name, playing: false, songs: [] };
			if(s.currentVoiceChannel === msg.member.voiceChannel) return msg.channel.send("I'm already in this channeru.");;
			s.currentVoiceChannel = msg.member.voiceChannel || null;
			s.currentVoiceChannel ? s.currentVoiceChannel.join() : msg.channel.send('Notto in voice channeru.');
		}
	},
	
	'leave': {
		name: 'leave',
		desc: 'Leave voice channel.',
		dothis: function(msg, s){
			if(!s.currentVoiceChannel) return msg.channel.send("I'm not in voice channeru.");
			if(s.currentVoiceChannel != msg.member.voiceChannel) return msg.channel.send('Nah.');
			s.currentVoiceChannel.leave();
			s.currentVoiceChannel = null;
		}
	},
	
	'add': {
		name: 'add',
		desc: 'Add song to list.',
		dothis: async function(msg, s){
			if(!msg.member.voiceChannel) return msg.react('đź”‡');
			if(!words[1]) return;
			let searchString = words.slice(1).join(' ');
			let msgAuthor = msg.author.username;
			
			let videos = await youtube.searchVideos(searchString, 10)
			.catch( e => console.log(e.stack) );
			
			msg.channel.send(`
				${videos.map( (vid, index) => `**${++index}. ** ${vid.title}`).join('\n')}
			`).catch( e => {
				console.log(e.stack);
				return msg.channel.send('Not my bad. Youtube dumb.');
			});
			
			let songIndex;
			
			await msg.channel.awaitMessages(msg => msg.content > 0, {
				max: 1,
				time: 15000,
				errors: ['time'],
			})
			.then((collected) => {
				if(!collected) return;
				songIndex = collected.first().content;
			})
			.catch(() => { return msg.channel.send('No correct song picked.'); });
			if(!songIndex) break;
			
			if(videos[songIndex - 1].durationSeconds > 420) return msg.channel.send('Video too long.');
			
			let url = videos[songIndex - 1].url;
			
			yt.getInfo(url, (err, info) => {
				if(err) return msg.channel.send('Shitty link.');
				s.songs.push( {url: url, title: info.title, requester: msg.author.username} );
				msg.channel.send(`\`\`\`Added: ${info.title}\`\`\``);
			}).catch( () => { return console.log('Youtube search error.'); } );
		}
	},
	
	'list': {
		name: 'list',
		desc: 'Show list of songs.',
		dothis: function(msg){
			
		}
	},
	
	'clear': {
		name: 'clear',
		desc: 'Clear list of songs.',
		dothis: function(msg){
			
		}
	},
	
	'play': {
		name: 'play',
		desc: 'Play first song on list.',
		dothis: function(msg){
			
		}
	},
	
	'skip': {
		name: 'skip',
		desc: 'Skip current playing song.',
		dothis: function(msg){
			
		}
	},
	
	'np': {
		name: 'np',
		desc: 'Show current playing song.',
		dothis: function(msg){
			
		}
	},
	
	'yomomma': {
		name: 'yomomma',
		desc: 'Random yomomma joke.',
		dothis: function(msg){
			request.get('http://api.yomomma.info/').then( (result) => {
				let joke = JSON.parse(result.text);
				return msg.channel.send(joke.joke);
			});
		}
	},
	
	'wisdom': {
		name: 'wisdom',
		desc: 'Random wisdom.',
		dothis: function(msg){
			request.get('https://api.adviceslip.com/advice').then( (result) => {
				let wise = JSON.parse(result.text);
				return msg.channel.send(wise.slip.advice);
			});
		}
	},
	
	'8ball': {
		name: '8ball',
		desc: 'Answer for your question.',
		dothis: function(msg){
			request.get('https://8ball.delegator.com/magic/JSON/0').then( (result) => {
				let answer = JSON.parse(result.text);
				return msg.channel.send(answer.magic.answer);
			});
		}
	},
	
	'trump': {
		name: 'trump',
		desc: 'What does Trump think.',
		dothis: function(msg){
			request.get('https://api.tronalddump.io/random/quote').then( (result) => {
				let thonk = JSON.parse(result.text);
				return msg.channel.send({ "embed": {
					"title": thonk.tags[0],
					"description": thonk.value,
					"timestamp": thonk.appeared_at,
					"thumbnail": {
						"url": "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg"
					},
					"author": {
						"name": "Trump's thought",
						"url": thonk._embedded.source[0].url
					}
				}});
			});
		}
	},
	
	'servers': {
		name: 'servers',
		desc: 'Show list servers bot is connected to.',
		dothis: function(msg){
			
		}
	},
	
	'anime': {
		name: 'anime',
		desc: 'Look for anime source.',
		dothis: function(msg){
			let imageurl = msg.attachments.first().url || msg.embeds[0].image.url || words[1] || 0;
			
			Jimp.read(imageurl).then( img => {
				img.getBase64Async(img.getMIME()).then( res => {
					fetch('https://trace.moe/api/search', {
						method: 'POST',
						body: JSON.stringify({ image: res }),
						headers: { 'Content-Type': 'application/json' }
					})
					.then( res => res.json() )
					.then( r => {
						msg.channel.send({ "embed": {
							"title": r.docs[0].title_romaji || '???',
							"description": `Episode: ${r.docs[0].episode} || ?,  Time: ${Math.floor(r.docs[0].at/3600)}:${Math.floor(r.docs[0].at/60)}:${Math.floor(r.docs[0].at % 60)}\n
											[MAL](https://myanimelist.net/anime/${r.docs[0].mal_id})  [ANILIST](https://anilist.co/anime/${r.docs[0].anilist_id})`,
							"thumbnail": {
								"url": `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/${r.docs[0].anilist_id}.jpg`
							},
							"author": {
								"name": r.docs[0].title_native || '???',
								"url": `https://myanimelist.net/anime/${r.docs[0].mal_id}`
							}
						}});
					})
					.catch(e => {
						console.log(e.stack);
						msg.channel.send(`Nothing.`);
					});
					
				});
			}).catch(e => console.log(e.stack));
			
			
			
		}
	}
	
	
	
}