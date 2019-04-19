module.exports = {
	name: 'skip',
	help: 'Skip current playing song.',
	alias: [],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(!userCh || !botCh || userCh !== botCh) return msg.react('🔇');
		
		if(!bot.guilds.get(msg.guild.id).music.playing) return msg.react('🔇');
		
		bot.guilds.get(msg.guild.id).music.dispatcher.end();
	}
}