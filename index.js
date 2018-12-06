const Jimp = require('jimp');
const Discord = require('discord.js');
const bot = new Discord.Client();

const commands = ['help', 'ping', 'avatar', 'slap'];
const commandPrefix = '!';

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if(message.author.bot) return;
    
	if(message.content[0] === commandPrefix){	
		let command = message.content.split(" ")[0].substring(1);
		
		switch(command){
			case commands[0]:
				message.channel.send({"embed": {
					"title": 'Available commands:',
					"description": '1. help \n 2. ping \n 3. avatar'
				}});
				break;
			case commands[1]:
				message.channel.send('pongogongo');		//ping
				break;
				
			case commands[2]:
				let user = '';
				message.mentions.users.first() ? user = message.mentions.users.first() : user = message.author;
				message.channel.send({"embed": {
					"image": {
					  "url": user.displayAvatarURL
					}
				}});
				message.channel.send('UHOHOHOOOHO');
				break;
				
			case commands[3]:
				if(!message.mentions.users.first()) return;
				let bg = 'images/slap.PNG';
				let img1 = message.author.displayAvatarURL;
				let img2 = message.mentions.users.first().displayAvatarURL;
				let out;
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
			
			default:
				message.channel.send('Oi, ');
		}
		
		
    //message.reply('pongg');
    
	}
});


bot.login(process.env.BOT_TOKEN);
