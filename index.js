
const Jimp = require('jimp');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.YT_KEY);
const yt = require('ytdl-core');
const Discord = require('discord.js');
const bot = new Discord.Client();

const commandPrefix = '.';
const commands = ['help', 'random', 'avatar', 'slap', 'join', 'leave', 'add', 'skip', 'q', 'clear'];

const belialWords = ["sodomy", "sex", "anal", "libido", "orgasm"];

const belialMessages = ["UHOHOHOOOHO!", "Mhmmm, do you want to be my koneko-chuan?", "Let me show you my powerfull libido.", 
						"Saikou no ecstasy!!!", "Gahaha!!! The golden ratio! Yabai, i'll shit myself!!!", "I am all yours.", 
						"Yaas, pleasure me more.", "I wouldn't mind letting you smash me.", "Let's do some sodomy.", "Perfection.",
						"Oi, wanna some sodomy?", "Ooh, yeah! We're definitely doing this!", "You're getting me all hot and bothered.", 
						"Our first time ought to be perfect."];
						
const noCommandMessages = ["The Archangel of Cumming, Belial.", "Try adding more sodomy.", "Yare yare daze.", "I don't think so.", "How about no?", 
						   "Have you seen my dog?", "That's not what i was expecting from you."];

let disServ = {};
let mention;
let randomNumber;
let voiceChannel;
let dispatcher;

bot.on('ready', () => {
    console.log('Belial is ready to serve.');
});

bot.on('disconnect', () => {
    console.log('Belial going to rest. Need more libido.');
});

bot.on('message', async message => {
    if(message.author.bot) return;
    
	let words = message.content.toLowerCase().split(" ");

	words.filter( function(word){
		if(belialWords.indexOf(word) != -1){
			message.react(bot.emojis.find(emoji => emoji.name === "ppp"));
			return;
		}
	});
	
	if((words[0])[0] === commandPrefix){
		if(words[0][1].includes('.')) return;
		let command = words[0].substring(1);
		
		switch(command){
			case 'h':
			case commands[0]://help
				message.channel.send(`
**Commands:**
${commands.map( (com, index) => `${com}`).join(', ')}

Use me for whatever you want.`
				);
				break;
				
			case commands[1]://random
				randomNumber = Math.floor(Math.random()*(message.content.split(" ")[1]));
				message.channel.send("Your number: 	"+randomNumber);
				break;
				
			case commands[2]://avatar
				mention = message.mentions.users.first() || message.author || null;
				if(!mention) break;
				
				message.channel.send({"embed": {
					"image": {
					  "url": mention.displayAvatarURL
					}
				}});
				
				if(mention.username != 'Belial' && Math.random() < 0.5){
					randomNumber = Math.floor( Math.random()*(belialMessages.length) );
					message.channel.send( 
						mention+" "+belialMessages.find( function(elem, index, self){
							if(index === randomNumber) return self[index];
						})
					);
				}
				break;
				
			case commands[3]://slap
				mention = message.mentions.users.first();
				
				if(!mention){
					message.reply(`You just wasted 1 slap. Think about your existance. ${bot.emojis.find(emoji => emoji.name === "kannaangry2")}`);
					return;
				}
				let bg = 'images/slap.PNG';
				let img1 = message.author.displayAvatarURL;
				let img2 = mention.displayAvatarURL;
				Jimp.read(img2).then( function(front2){
					front2.rotate(30);
					front2.resize(120, 120);
					Jimp.read(img1).then( function(front1){
						front1.resize(100, 100);
						Jimp.read(bg).then( function(back){
							back.composite(front2, 60, 280).composite(front1, 220, 140).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
								if(err){
									console.log('Oh no. Error during slap.');
									return;
								}
								message.channel.send({ files: [{ attachment: buffer, name: 'slapped.png'}] }).then( () => {
									if(mention.username === 'Belial') message.channel.send(`MY INNER MASOCHISM IS SCREAMING!!!\nUHOOHOHOHOHOHOOOHOOOOO!!!`);
								});;
							});
						});
					});
				});
				break;
				
			case 'ugay':
			case 'ugai':
			case 'ugei':
			case 'ugey':
				message.channel.send('No, u.');
				break;
				
			case commands[4]://join
				if (!disServ[message.guild.id] || !disServ[message.guild.id].songs[0]) disServ[message.guild.id] = {}, disServ[message.guild.id].playing = false, disServ[message.guild.id].songs = [];;
				voiceChannel = message.member.voiceChannel;
				if(voiceChannel){
					voiceChannel.join();
				}else{
					message.channel.send('Join voice channel first.');
					return;
				}
				break;
				
			case commands[5]://leave
				voiceChannel = message.member.voiceChannel;
				if(voiceChannel){
					voiceChannel.leave();
				}else{
					message.channel.send('Join voice channel first.');
					return;
				}
				break;
				
			case 'add':
				if(!message.member.voiceChannel){
					message.channel.send('Oi, you not in voice channel.');
					return;
				}
				if(!words[1]) return;
				let searchString = words.slice(1).join(' ');
				let msgAuthor = message.author.username;
				
				let videos = await youtube.searchVideos(searchString, 10);
				
				message.channel.send(`
					${videos.map( (vid, index) => `**${++index} -** ${vid.title}`).join('\n')}
				`);
				
				let songIndex;
				
				await message.channel.awaitMessages(msg => msg.content > 0, {
					max: 1,
					time: 15000,
					errors: ['time'],
				})
				.then((collected) => {
					songIndex = collected.first().content;
				})
				.catch(() => {
					message.channel.send('Too late.');
					return;
				});
				if(!songIndex) break;
				
				let url = videos[songIndex - 1].url;
				
				yt.getInfo(url, (err, info) => {
					if(err) return message.channel.send('Shitty link.');
					disServ[message.guild.id].songs.push( {url: url, title: info.title, requester: message.author.username} );
					message.channel.send(`Added: **${info.title}**`);
				});
				
				break;
				
			case 'l':
			case 'list':
			case 'q':
			case 'queue':
				if(!message.member.voiceChannel){
					message.channel.send('Oi, you not in voice channel.');
					return;
				}
				if (!disServ[message.guild.id].songs[0]) return message.channel.send(`Nothing.`);
				let tosend = [];
				disServ[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
				message.channel.send(`__**Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
				break;
				
			case 'c':
			case 'clear':
				if(!message.member.voiceChannel){
					message.channel.send('Oi, you not in voice channel.');
					return;
				}
				let index = words[1] || null;
				console.log(index);
				if(index > 0 && index < disServ[message.guild.id].songs.length + 1){
					disServ[message.guild.id].songs.filter( (elem, i) => {
						return (i === (index - 1));
					});
					// disServ[message.guild.id].songs.filter( function(word){
						// if(belialWords.indexOf(word) === index - 1) return;
					// });
				}else{
					disServ[message.guild.id].songs = [];
					message.channel.send('List cleared.');
				}
				break;
				
			case 'play':
				if(!message.member.voiceChannel){
					message.channel.send('Oi, you not in voice channel.');
					return;
				}
				if (!disServ[message.guild.id].songs[0]) return message.channel.send('Nothing to play.');
				if (disServ[message.guild.id].playing) return message.channel.send("I'm already playing!!!");
				dispatcher = {};
				disServ[message.guild.id].playing = true;
				
				(function play(song) {
					if (song === undefined) return message.channel.send('Nothing to play.').then(() => {
						disServ[message.guild.id].playing = false;
					});
					message.channel.send(`Playing: **${song.title}** as requested by: **${song.requester}**`);
					
					dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : 1 });
					dispatcher.on('end', () => {
						play(disServ[message.guild.id].songs.shift());
					});
					dispatcher.on('error', () => {
						return message.channel.sendMessage('Shit happened.').then(() => {
							play(disServ[message.guild.id].songs.shift());
						});
					});
				})(disServ[message.guild.id].songs.shift());

				break;
				
			case 'skip':
				if(!message.member.voiceChannel){
					message.channel.send('Oi, you not in voice channel.');
					return;
				}
				dispatcher.end();
				break;
				
			default: //noCommand
				randomNumber = Math.floor( Math.random()*(noCommandMessages.length) );
				message.channel.send( 
					`There is no such command.`
					// noCommandMessages.find( function(elem, index, self){
						// if(index === randomNumber) return self[index];
					// })
				);
		}
		
	}
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}. \n Have fun with these guys.`);
});


//bot.login(process.env.BOT_TOKEN);
bot.login(BOT_TOKEN);
