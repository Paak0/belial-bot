const Discord = require('discord.js');
const bot = new Discord.Client();
const commands = ['!avatar', ''];


bot.on('ready', () => {
    console.log('I am ready!');
});

bot.on('message', message => {
    let command = message.content;
    
    //let mention = message.mentions.users.array();
    if(message.mentions){
        message.channel.sendMessage("mention is up");
        //message.channel.sendMessage(message.mentions.users.array()[0].username);
    }
    
    
    if (command[0] === '!') {
        if(command === commands[0]){
            let url = message.author.avatarURL;
           
            //message.channel.sendMessage(url);
            message.channel.send({"embed": {
                "image": {
                  "url": url
                }
            }});
        }
    	//message.reply('pongg');
  	}
    message.reply('UHOHOHOOOHO');
});

bot.login(process.env.BOT_TOKEN);
