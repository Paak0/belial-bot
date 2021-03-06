module.exports = {
	name: 'leave',
	help: 'Leave current voice channel.',
	alias: ['l'],
	run: (bot, msg) => {
		let botCh = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userCh = msg.member.voiceChannel.connection;
		
		if(!botCh || !userCh) return msg.react('🔇');
		if(botCh !== userCh) return msg.react('🔇');
		
		bot.guilds.get(msg.guild.id).music.voiceChannel.disconnect();
		
		bot.guilds.get(msg.guild.id).music = {
			playing: false,
			songs: [],
			voiceChannel: null,
			currentlyPlayed: {},
			dispatcher: {}
		};
	}
}