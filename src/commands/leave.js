module.exports = {
	name: 'leave',
	help: 'Leave current voice channel.',
	alias: ['l'],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel;
		
		if(!botCh || !userCh) return msg.react('🔇');
		if(botCh !== userCh) return msg.react('🔇');
		
		bot.guilds.get(msg.guild.id).music = {
			playing: false,
			songs: [],
			voiceChannel: null,
			currentlyPlayed: '',
			dispatcher: {}
		};
		
		botCh.leave();
	}
}