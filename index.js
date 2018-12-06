const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    
    if(!message.author.bot){
    
        let command = message.content;

        if(command === 'ping') message.channel.sendMessage('pongogongo');
        
        if (command[0] === '!') {
            if(command === commands[0]){
                let person = message.mentions.members.first().user || message.author;
                /*
                let url = '';
                if(message.mentions.members.first()){
                    url = message.mentions.members.first().user.avatarURL;
                }else{
                    url = message.author.avatarURL;
                }
                message.channel.sendMessage(url);
                */
                message.channel.send({"embed": {
                    "image": {
                      "url": person.displayAvatarURL
                    }
                }});
                message.channel.sendMessage('UHOHOHOOOHO');
            }
            //message.reply('pongg');
        }

    }
});

bot.login(process.env.BOT_TOKEN);
