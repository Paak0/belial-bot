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
            var embed = new Discord.RichEmbed()
            .setTitle(`Title`)
            .setDescription(`Desc`)
            .addField("Title", "Description");
            message.channel.sendEmbed(embed);
        }
        
        
        
        
        
    	//message.reply('pongg');
  	}
});

bot.login(process.env.BOT_TOKEN);
