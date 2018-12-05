const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if (message.content === 'ping') {
    	//message.reply('pongg');
        message.channel.sendMessage(message.content[0]);
  	}
});

bot.login(process.env.BOT_TOKEN);
