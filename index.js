
const request = require('superagent');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
const config = require('./src/config.js');
const botToken = config.token || process.env.BOT_TOKEN;
const commands = require('./src/commands.js');
const characters = require('./src/characters.json');
bot.belial = require('./src/belial.js');

//========================================================   gbf sounds
let soundNames = ['them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 
				  'win', 'lose', 'attack', 'kill', 'ready', 'mortal', 'damage', 
				  'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 'formation', 
				  'archive', 'to_player', 'healed', 'helaled', 'hp_down', 'power_down', 'player_gauge', 'special'];
let adds = ['', 'a', 'b', '_a', '_b', '_mix'];
let sounds = [];
//========================================================


bot.commands = new Discord.Collection();

fs.readdir('./src/commands/', (e, f) => {
	if(e) return console.log(e);
	f.map( c => {
		let cmd = require(`./src/commands/${c}`);
		bot.commands.set(cmd.name, cmd);
	});
	console.log(`Loading commands: done.`);
});

bot.on('ready', () => {
	bot.guilds.map( g => {
		g.cmdPrefix = '.';
		g.msgCounter = 0;
		g.lastMsg = '';
		g.music = {
			playing: false,
			songs: [],
			voiceChannel: null,
			currentlyPlayed: '',
			dispatcher: {}
		};
	});
	
    console.log(`
#################################\n
    Belial is ready to serve.\n
#################################\n`);
	console.log(`Connected to ${bot.guilds.size} servers:\n${bot.guilds.map( g => '- '+g.name ).join('\n')}\n`);
});


bot.on('message', async message => {
    if(message.author.bot) return;
	let words = message.content.toLowerCase().split(' ');
	let msgGuild = bot.guilds.get(message.guild.id);
	
	if(words[0].startsWith('<:')){
		if(message.content === msgGuild.lastMsg){
			if(msgGuild.msgCounter == 2){
				let emo = bot.emojis.find(emoji => emoji.name === words[0].split(':')[1]) || 0;
				if(emo) message.channel.send(words[0]);
				bot.guilds.get(message.guild.id).msgCounter = 0;
				bot.guilds.get(message.guild.id).lastMsg = '';
			}else{
				bot.guilds.get(message.guild.id).msgCounter++;
			}
		}else{
			bot.guilds.get(message.guild.id).msgCounter = 1;
			bot.guilds.get(message.guild.id).lastMsg = message.content;
		}
	}
	
	words.filter( function(word){
		if(bot.belial.words.indexOf(word) != -1) return message.react(bot.emojis.find(emoji => emoji.name === 'ppp'));
	});
	
	if(words[0].startsWith(msgGuild.cmdPrefix)){
		if(words[0][1].includes(msgGuild.cmdPrefix)) return;
		
		let cmd = words[0].substring(1);
		let command = bot.commands.get(cmd) || null;
		if(command){ 
			command.run(bot, message, words);
		}else{
			message.react('⛔');
		}
			// case 'gay':
			// case 'gey':
			// case 'gai':
			// case 'gei':
			// case 'ugay':
			// case 'ugai':
			// case 'ugei':
			// case 'ugey':
				// message.channel.send('No, u.');
				// break;
				
			// case 'play':
				// if(!message.member.voiceChannel){
					// message.react('🔇');
					// return;
				// }
				// if (!servers[message.guild.id].songs[0]) return message.channel.send('Nothing to play.');
				// if (servers[message.guild.id].playing) return message.channel.send("I'm already playing!!!");
				
				// servers[message.guild.id].playing = true;
				
				// (function play(song) {
					// dispatcher = {};
					// if (!song){
						// servers[message.guild.id].playing = false;
						// return;
					// }
					// currentlyPlayed = song.title;
					
					// dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { filter: 'audioonly' }), { seek: 1, passes: 4 });
					// dispatcher.on('end', () => {
						// play(servers[message.guild.id].songs.shift());
					// });
					// dispatcher.on('error', () => {
						// return message.channel.sendMessage('Shit happened.').then(() => {
							// play(servers[message.guild.id].songs.shift());
						// });
					// });
				// })(servers[message.guild.id].songs.shift());
				// break;
				
			// case 'np': 
			//if(servers[message.guild.id].playing) message.channel.send(`\`\`\`Playing: ${currentlyPlayed}\`\`\``);
				// break;
				
			// case 'skip':
				// if(!message.member.voiceChannel) return message.react('🔇');
				// if(servers[message.guild.id].playing) dispatcher.end();
				// break;
				
			// case 'test':
				// sounds = [];
				// let count = 1;
				
				// for(let i = 0; i < soundNames.length; i++){
					// for(let j = 1; j < 4; j++){
						// for(let k = 0; k < adds.length; k++){
							// request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ words[1] +'_'+soundNames[i]+j+adds[k]+'.mp3').then( res => {
								// if(!sounds.includes(soundNames[i])){
									// sounds[i] = soundNames[i];
								// }else{}
								// count++;
							// }).catch(e => {
								// count++;
							// });
						// }
					// }
				// }
				
				// for(let i = 0; i < soundNames.length; i++){
					// for(let j = 1; j < 4; j++){
						// request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ words[1] +'_'+soundNames[i]+'0'+j+'.mp3').then( res => {
							// if(!sounds.includes(soundNames[i])){
									// sounds[i] = soundNames[i];
							// }else{}
							// count++;
							// if(count == 525){
								// console.log('<----- done ------>'+words[1]);
								// console.log(sounds);
								// message.channel.send(`\[${sounds.map( (s, index) => `\'${s}\'`).join(', ')}, \'other\'\]`);
							// }
						// }).catch( (e) => {
							// count++;
							// if(count == 525){
								// console.log('<----- done ------>'+words[1]);
								// console.log(sounds);
								// message.channel.send(`\[${sounds.map( (s, index) => `\'${s}\'`).join(', ')}, \'other\'\]`);
							// }
						// } );
					// }
				// }
				// break;
				
			// case 'sound':
				// let c = [];
				// for(let i = 0; i < characters.ssr.length; i++){
					// request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/' + characters.ssr[i].id + '_' + words[1] + '.mp3').then( res => {
						// message.channel.send(`${characters.ssr[i].name}`);
					// }).catch(e => {});
				// }
				// message.channel.send(`<----- done ----->`);
				// break;
	}
});


bot.on('messageReactionAdd', emo => {
	if( emo.message.author.bot ) return;
	if( emo.message.attachments.first() || emo.message.embeds[0] ){
		let imageurl = emo.message.attachments.first().url || emo.message.embeds[0].image.url || 0;
		if( !imageurl ) return console.log('<----- No image url. ----->');
		let url = 'https://saucenao.com/search.php?output_type=2&numres=5&minsim=80&url=' + imageurl;
		const filter = (reaction, user) => reaction.emoji.name === "\u0031\u20E3" && !user.bot;
		const collector = emo.message.createReactionCollector(filter);
		collector.on('collect', () => {
			request.post(url).then( r => {
				let sauce = r.body.results.filter( s => {return s.header.similarity > 80;} );
				if(sauce.length < 1){
					emo.message.channel.send(`No results.`);
				}else{
					emo.message.channel.send(`
**SauceNAO:**\n${sauce.map( (s, index) => `**${++index}.** Accuracy: ${s.header.similarity}% ${s.data.ext_urls[0]}`).join('\n')}
					`);
				}
			});
			collector.stop();
			emo.message.clearReactions();
		});
	}
});


bot.on('guildCreate', g => {
	console.log(`     ${client.user.username} has joined to ${g.name}.`);
	g.cmdPrefix = '.';
	g.msgCounter = 0;
	g.lastMsg = '';
	g.music = {
		playing: false,
		songs: [],
		voiceChannel: null,
		currentlyPlayed: '',
		dispatcher: {}
	};
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`<----- Welcome to the server, ${member}. Have fun with these guys. ----->`);
});


bot.login(botToken);