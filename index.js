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
              const embed = new RichEmbed()
              .setTitle('A slick little embed')
              .setColor(0xFF0000)
              .setDescription('Hello, this is a slick embed!');
            message.channel.send(embed);
        }
        
        
        
        
        
    	//message.reply('pongg');
  	}
});

bot.login(process.env.BOT_TOKEN);
