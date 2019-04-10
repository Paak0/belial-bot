module.exports = {
	name: 'clear',
	help: 'Remove songs from list. [ every song or selected ]',
	alias: ['c', 'purge'],
	run: (bot, msg, words) => {
		if(!msg.member.voiceChannel) return msg.react('🔇');
		let songsLength = bot.guilds.get(msg.guild.id).music.songs.length;
		if(!songsLength) return msg.channel.send(`List is empty.`);
		
		let sel = parseInt(words[1]);
		if(isNaN(sel) || sel < 1 || sel > songsLength) return msg.react('⛔');
		
		if(!sel){
			bot.guilds.get(msg.guild.id).music.songs = [];
			msg.react('✅');
		}else{
			bot.guilds.get(msg.guild.id).music.songs.splice(sel - 1, 1);
			msg.react('✅');
		}
	}
}