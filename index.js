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
            let url = '';
            let mention = message.mentions.users.first();
            
            if(mention){
                url = message.mentions.users[0].avatarURL;
                message.channel.sendMessage("mention is up");
                message.channel.sendMessage(message.mentions.users[0].username);
            }else{
                url = message.author.avatarURL;
            }
            //message.channel.sendMessage(url);
            message.channel.send({"embed": {
                "image": {
                  "url": url
                }
            }});
        }
    	//message.reply('pongg');
  	}
});

bot.login(process.env.BOT_TOKEN);
