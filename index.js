const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    let command = message.content;
    if (command[0] === '!') {
        if(command === commands[0]){
            //message.reply(message.author.avatarURL);
            let attachment = new Attachment(message.author.avatarURL);
            message.channel.send(attachment);
        }
        
        
        
        
        
    	//message.reply('pongg');
  	}
});

bot.login(process.env.BOT_TOKEN);
