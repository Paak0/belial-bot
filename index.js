const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    
    if(!message.author.bot){
    
        let command = message.content;

        if(message.mentions.members.first()){
            message.channel.sendMessage("mention is up");
            message.channel.sendMessage(message.mentions.members.first().user.avatarURL);
        }


        if (command[0] === '!') {
            if(command === commands[0]){
                let url = message.author.avatarURL;

                message.channel.send({"embed": {
                    "image": {
                      "url": url
                    }
                }});
            }
            //message.reply('pongg');
        }

        message.channel.sendMessage('UHOHOHOOOHO');
        
    }
});

bot.login(process.env.BOT_TOKEN);
