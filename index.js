const BOT_TOKEN = 'NTIwMDA1MDQ4NjUwOTU2ODIx.DunlYw.ksJNHK2DbkAJjz9Adoy4SrUXNno';
const YT_KEY = 'AIzaSyDdfW62XfmScmaxaKlMpVeextra-HmxR68';

const request = require('superagent');

const YouTube = require('simple-youtube-api');
// const youtube = new YouTube(process.env.YT_KEY);
const youtube = new YouTube(YT_KEY);
const yt = require('ytdl-core');

const Discord = require('discord.js');
const bot = new Discord.Client();

const commands = require('./src/commands.js');

const commandPrefix = '.';
const commandsNames = [
	'help', 'random', 'info', 'avatar', 'slap', 
	'join', 'leave', 'add', 'skip', '[ l, list, q, queue ]', '[ c, clear ]'
];

const belialWords = require('./src/belial.js').words;

let servers = {};
let user;
let mention;
let randomNumber;
let voiceChannel;
let dispatcher;
let currentlyPlayed;

bot.on('ready', () => {
	bot.guilds.map( guild => { 
		servers[guild.id] = {
			name: guild.name,
			playing: false,
			songs: []
		}
	});
    console.log('Belial is ready to serve.');
});

bot.on('disconnect', () => {
    console.log('Belial going to rest. Need more libido.');
});

bot.on('reconnecting', () => {
    console.log('Reconnecting.');
});

bot.on('message', async message => {
    if(message.author.bot) return;
    
	let words = message.content.toLowerCase().split(' ');

	words.filter( function(word){
		if(belialWords.indexOf(word) != -1){
			message.react(bot.emojis.find(emoji => emoji.name === 'ppp'));
			return;
		}
	});
	
	if((words[0])[0] === commandPrefix){
		if(words[0][1].includes('.')) return;
		let command = words[0].substring(1);
		
		switch(command){
			case 'h':
			case 'help':
				message.channel.send(`
**Commands:**
${commandsNames.map( (com, index) => `${com}`).join(', ')}

Use me for whatever you want.`
				);
				break;
				
			case 'random': commands.random.dothis(message);
				break;
				
			case 'avatar': commands.avatar.dothis(message);
				break;
				
			case 'slap': commands.slap.dothis(message);
				break;
				
			case 'gay':
			case 'gey':
			case 'gai':
			case 'gei':
			case 'ugay':
			case 'ugai':
			case 'ugei':
			case 'ugey':
				message.channel.send('No, u.');
				break;
				
			case 'info': commands.info.dothis(message);
				break;
				
			case 'join':
				commands.join.dothis(message, servers);
				// if (!disServ[message.guild.id] || !disServ[message.guild.id].songs[0]) disServ[message.guild.id] = {}, disServ[message.guild.id].playing = false, disServ[message.guild.id].songs = [];;
				// voiceChannel = message.member.voiceChannel;
				// if(voiceChannel) voiceChannel.join();
				// else message.channel.send(message.guild.id);
				break;
				
			case 'leave':
				commands.leave.dothis(message);
				// voiceChannel = message.member.voiceChannel;
				// if(voiceChannel) voiceChannel.leave();
				// else message.channel.send('Notto in voice channeru.');
				break;
				
			case 'add':
				if(!message.member.voiceChannel) return message.react('🔇');
				if(!words[1]) return;
				let searchString = words.slice(1).join(' ');
				let msgAuthor = message.author.username;
				
				let videos = await youtube.searchVideos(searchString, 10);
				
				message.channel.send(`
					${videos.map( (vid, index) => `**${++index}. ** ${vid.title}`).join('\n')}
				`).catch( err => {
					console.log(err);
					return message.channel.send('Not my bad. Youtube dumb.');
				});
				
				let songIndex;
				
				await message.channel.awaitMessages(msg => msg.content > 0, {
					max: 1,
					time: 15000,
					errors: ['time'],
				})
				.then((collected) => {
					if(!collected) return;
					songIndex = collected.first().content;
				})
				.catch(() => {
					message.channel.send('No correct song picked.');
					return;
				});
				if(!songIndex) break;
				
				if(videos[songIndex - 1].durationSeconds > 420) return message.channel.send('Video too long.');
				
				let url = videos[songIndex - 1].url;
				
				yt.getInfo(url, (err, info) => {
					if(err) return message.channel.send('Shitty link.');
					servers[message.guild.id].songs.push( {url: url, title: info.title, requester: message.author.username} );
					message.channel.send(`\`\`\`Added: ${info.title}\`\`\``);
				});
				break;
				
			case 'l':
			case 'list':
			case 'q':
			case 'queue':
				if(!message.member.voiceChannel){
					message.react('🔇');
					return;
				}
				if (!servers[message.guild.id].songs[0]) return message.channel.send(`Nothing.`);
				let tosend = [];
				servers[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
				message.channel.send(`__**Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
				break;
				
			case 'c':
			case 'clear':
				if(!message.member.voiceChannel){
					message.react('🔇');
					return;
				}
				let index = words[1] || null;
				if(index > 0 && index < servers[message.guild.id].songs.length + 1){
					let title = servers[message.guild.id].songs.splice(index - 1, 1).title;
					message.channel.send(`Song: ${title} deleted.`);
				}else{
					servers[message.guild.id].songs = [];
					message.channel.send(`List cleared.`);
				}
				break;
				
			case 'play':
				if(!message.member.voiceChannel){
					message.react('🔇');
					return;
				}
				if (!servers[message.guild.id].songs[0]) return message.channel.send('Nothing to play.');
				if (servers[message.guild.id].playing) return message.channel.send("I'm already playing!!!");
				
				servers[message.guild.id].playing = true;
				
				(function play(song) {
					dispatcher = {};
					if (!song){
						servers[message.guild.id].playing = false;
						return;
					}
					currentlyPlayed = song.title;
					
					dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { filter: 'audioonly' }), { seek: 1, passes: 4 });
					dispatcher.on('end', () => {
						play(servers[message.guild.id].songs.shift());
					});
					dispatcher.on('error', () => {
						return message.channel.sendMessage('Shit happened.').then(() => {
							play(servers[message.guild.id].songs.shift());
						});
					});
				})(servers[message.guild.id].songs.shift());
				break;
				
			case 'np': if(servers[message.guild.id].playing) message.channel.send(`\`\`\`Playing: ${currentlyPlayed}\`\`\``);
				break;
				
			case 'skip':
				if(!message.member.voiceChannel){
					message.react('🔇');
					return;
				}
				dispatcher.end();
				break;
				
			case 'yomomma': commands.yomomma.dothis(message);
				break;
				
			case 'wisdom': commands.wisdom.dothis(message);
				break;
				
			case 'trump': commands.trump.dothis(message);
				break;
				
			default: message.react('⛔');
		}
	}
});


bot.on('messageReactionAdd', () => {
	try{
		if(message.author.username == 'Paako' && message.attachments.first().url ) {
			message.react( "\u0031\u20E3" );
			const filter = (reaction, user) => reaction.emoji.name === "\u0031\u20E3" && !user.bot;
			const collector = message.createReactionCollector(filter);
			collector.on('collect', () => {
				message.channel.send(message.attachments.first().url);
				collector.stop();
			});
		}
	}catch(err){ console.log(err); }
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}. \n Have fun with these guys.`);
});


// bot.login(process.env.BOT_TOKEN);
bot.login(BOT_TOKEN);
