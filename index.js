const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if(message.author.bot) return;
    
    //if(message.mentions.members.first()) message.channel.send(message.mentions.members.first().user.avatarURL); //works

    let command = message.content;

    if(command === 'ping') message.channel.send('pongogongo');

    
    if(command === '!avatar'){

        if(message.mentions.members.first()){
            message.channel.send({"embed": {
                "image": {
                  "url": message.mentions.members.first().user.avatarURL
                }
            }});   
        }else{
             message.channel.send({"embed": {
                "image": {
                  "url": message.author.avatarURL
                }
            }});
        }
        /*
        let url = '';
        if(message.mentions.members.first()){
            url = message.mentions.members.first().user.avatarURL;
        }else{
            url = message.author.avatarURL;
        }
        message.channel.sendMessage(url);
        
        message.channel.send({"embed": {
            "image": {
              "url": avUrl
            }
        }});
        */
        message.channel.send('UHOHOHOOOHO');
    }
    //message.reply('pongg');
    

    
});

bot.login(process.env.BOT_TOKEN);
