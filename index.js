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
            let avatar = new RichEmbed();
            avatar.setTitle('Avatar link');
            avatar.setURL(message.author.avatarURL);
            message.channel.sendMessage(avatar);
        }
        
        
        
        
        
    	//message.reply('pongg');
  	}
});

bot.login(process.env.BOT_TOKEN);
