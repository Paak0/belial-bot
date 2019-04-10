module.exports = {
	name: 'leave',
	help: 'Leave current voice channel.',
	alias: ['l'],
	run: (bot, msg) => {
		let botChannel = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userChannel = msg.member.voiceChannel || 0;
		
		if(!botChannel || !userChannel) return msg.react('🔇');
		if(botChannel !== msg.member.voiceChannel) return msg.react('🔇');
		
		botChannel.leave();
		bot.guilds.get(msg.guild.id).music = {
			playing: false,
			songs: [],
			voiceChannel: null,
			currentlyPlayed: '',
			dispatcher: {}
		};
	}
}