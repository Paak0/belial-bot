const Jimp = require('jimp');
const Discord = require('discord.js');
const bot = new Discord.Client();

const commandPrefix = '!';
const commands = ['help', 'random', 'avatar', 'slap', 'join', 'leave'];

const belialWords = ["sodomy", "sex", "anal", "libido", "orgasm"];

const belialMessages = ["UHOHOHOOOHO!", "Mhmmm, do you want to be my koneko-chuan?", "Let me show you my powerfull libido.", 
						"Saikou no ecstasy!!!", "Gahaha!!! The golden ratio! Yabai, i'll shit myself!!!", "I am all yours.", 
						"Yaas, pleasure me more.", "I wouldn't mind letting you smash me.", "Let's do some sodomy.", "Perfection 💕",
						"Ooh, yeah! We're definitely doing this!", "You're getting me all hot and bothered.", 
						"Our first time ought to be perfect."];
						
const noCommandMessages = ["The Archangel of Cumming, Belial.", "Try adding more sodomy.", "Yare yare daze.", "Oi, wanna some sodomy?", "I don't think so.", "How about no?", 
						   "Have you seen my dog?", "That's not what i was expecting from you."];

let randomNumber;


bot.on('ready', () => {
    console.log('Belial is ready to serve.');
});

bot.on('disconnect', () => {
    console.log('Belial going to rest. Need more libido.');
});

bot.on('message', message => {
    if(message.author.bot) return;
    
	let words = message.content.toLowerCase().split(" ");

	words.filter( function(word){
		if(belialWords.indexOf(word) != -1){
			message.react(bot.emojis.find(emoji => emoji.name === "ppp"));
			return;
		}
	});
	
	if((words[0])[0] === commandPrefix){	
		let command = words[0].substring(1);
		
		switch(command){
			case commands[0]://help
				message.channel.send("```Available commands: \n 1. help \n 2. ping \n 3. avatar \n 4. slap```");
				break;
				
			case commands[1]://random
				let nbr = Math.floor(Math.random()*(message.content.split(" ")[1]));
				message.channel.send("Your number: 	"+nbr);
				break;
				
			case commands[2]://avatar
				let user = '';
				message.mentions.users.first() ? user = message.mentions.users.first() : user = message.author;
				message.channel.send({"embed": {
					"image": {
					  "url": user.displayAvatarURL
					}
				}});
				if(user.username === 'Belial') break;
				if(Math.random() < 0.5){
					randomNumber = Math.floor( Math.random()*(belialMessages.length) );
					message.channel.send( 
						user+" "+belialMessages.find( function(elem, index, self){
							if(index === randomNumber) return self[index];
						})
					);
				}
				break;
				
			case commands[3]://slap
				if(!message.mentions.users.first()){
					message.reply(`don't you know who to slap? Maybe you want me to slap you? ${bot.emojis.find(emoji => emoji.name === "yuri")}`);
					return;
				}
				let bg = 'https://i.imgur.com/r2RnaXr.png';
				let img1 = message.author.displayAvatarURL;
				let img2 = message.mentions.users.first().displayAvatarURL;
				Jimp.read(img2).then( function(front2){
					front2.rotate(30);
					front2.resize(120, 120);
					Jimp.read(img1).then( function(front1){
						front1.resize(100, 100);
						Jimp.read(bg).then( function(back){
							back.composite(front2, 60, 280).composite(front1, 220, 140).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
								if(err){
									console.log('Oh no');
									return;
								}
								message.channel.send({ files: [{ attachment: buffer, name: 'slapped.png'}] });
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
				voiceChannel = message.member.voiceChannel;
				if(voiceChannel) voiceChannel.join();
				break;
				
			case commands[5]://leave
				voiceChannel = message.member.voiceChannel;
				if(voiceChannel) voiceChannel.leave();
				break;
				
			default: //noCommand
				randomNumber = Math.floor( Math.random()*(noCommandMessages.length) );
				message.channel.send( 
					noCommandMessages.find( function(elem, index, self){
						if(index === randomNumber) return self[index];
					})
				);
		}
		
	}
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}. \n Have fun with these guys.`);
});


bot.login(process.env.BOT_TOKEN);
