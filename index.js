const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    if(message.author.bot) return;
    
    let command = message.content;
    
    if(command === 'ping') message.channel.send('pongogongo');
    
    
    const member = message.mentions.members.first();
    //if(message.mentions.members.first()) message.channel.send(message.mentions.members.first().user.avatarURL); //works
    if(member) message.channel.send(member.user.avatarURL);
    
    
    
    if(command === '!avatar'){
        if(member) message.channel.send(member.user.avatarURL);
       
        message.channel.send(message.author.avatarURL);
        /*
        if(message.mentions.members.first()){
            message.channel.send({"embed": {
                "image": {
                  "url": message.mentions.members.first().user.displayAvatarURL
                }
            }});   
        }else{
             message.channel.send({"embed": {
                "image": {
                  "url": message.author.displayAvatarURL
                }
            }});
        }
        
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
        //message.channel.send('UHOHOHOOOHO');
    }
    //message.reply('pongg');
    

    
});

bot.login(process.env.BOT_TOKEN);
