const request = require('superagent');
const Jimp = require('jimp');
const belial = require('./belial.js');

module.exports = {
	
	'temp': {
		name: '',
		desc: '',
		dothis: function(msg){
			
		}
	},
	
	'random': {
		name: 'random',
		desc: 'Get random number. [default 0-10]',
		dothis: function(msg){
			let args = msg.content.split(' ');
			let min = args.length > 2 && !isNaN( Number(args[1]) ) ? parseInt(args[1]) : 0;
			let max = !isNaN( Number(args[2]) ) || !isNaN( Number(args[1]) ) ? parseInt(args[2]) || parseInt(args[1]) : 11;
			let randomNumber = Math.floor( Math.random()*(max - min) + min );
			msg.channel.send('Your number: 	' + randomNumber);
		}
	},
	
	'avatar': {
		name: 'avatar',
		desc: 'Show avatar.',
		dothis: function(msg){
			let user = msg.mentions.users.first() || msg.author;
				
			msg.channel.send( {'embed': {
				'image': {
				  'url': user.displayAvatarURL
				}
			}});
			
			if( user.username != 'Belial' && Math.random() < 0.5 ){
				let randomNumber = Math.floor( Math.random() * belial.messages.length );
				msg.channel.send( 
					user +' '+ belial.messages.find( (elem, index) => {
						return index === randomNumber;
					})
				);
			}
		}
	},
	
	'info': {
		name: 'info',
		desc: 'User informations.',
		dothis: function(msg){
			let mbr = msg.mentions.members.first() || msg.member;
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
						"value": "blahblahblah" }
				]
			}}).catch( err => { return console.log(err); });
		}
	},
	
	'slap': {
		name: 'slap',
		desc: 'Slap someone',
		dothis: function(msg){
			let mention = msg.mentions.users.first();
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
						back.composite(front2, 60, 280).composite(front1, 220, 140).getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
							if(err) return console.log('Oh no. Error during slap.');
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
		dothis: function(msg, servers){
			if(!servers[msg.guild.id]) servers[msg.guild.id] = { name: msg.guild.name, playing: false, songs: [] };
			let voiceChannel = msg.member.voiceChannel || null;
			if(voiceChannel) voiceChannel.join();
			else msg.channel.send('Notto in voice channeru.');
		}
	},
	
	'leave': {
		name: 'leave',
		desc: 'Leave voice channel.',
		dothis: function(msg){
			let voiceChannel = msg.member.voiceChannel;
			if(voiceChannel) voiceChannel.leave();
			else msg.channel.send('Notto in voice channeru.');
		}
	},
	
	'add': {
		name: 'add',
		desc: 'Add song to list.',
		dothis: function(msg){
			
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
		name: 'wisdom',
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
	}
	
	
	
	
	
}