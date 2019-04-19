module.exports = {
	name: 'join',
	help: 'Join to voice channel. [you need to be in voice channel]',
	alias: ['j'],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(botCh || !userCh) return msg.react('🔇');
		if(botCh === userCh) return msg.channel.send("I'm already here.");
		
		bot.guilds.get(msg.guild.id).music.voiceChannel = userCh;
		userCh.join();
	}
}