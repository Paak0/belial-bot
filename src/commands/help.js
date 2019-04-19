module.exports = {
	name: 'help',
	help: 'Help.',
	alias: [],
	run: (bot, msg, words) => {
		if(!words[1]){
			msg.channel.send(`${bot.commands.map( c => c.name )}`);
		}else{
			let command = bot.commands.get(words[1]) || null;
			if(command){ 
				msg.channel.send(`${command.name} - ${command.help}`);
			}else{
				msg.react('⛔');
			}
		}
	}
}