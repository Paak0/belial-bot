module.exports = {
	name: 'join',
	help: 'Join to voice channel. [you need to be in voice channel]',
	alias: ['j'],
	run: (bot, msg) => {
		let botChannel = bot.guilds.get(msg.guild.id).music.voiceChannel;
		let userChannel = msg.member.voiceChannel || 0;
		
		if(botChannel || !userChannel) return msg.react('🔇');
		if(botChannel === userChannel) return msg.channel.send("I'm already here.");
		
		bot.guilds.get(msg.guild.id).music.voiceChannel = userChannel;
		userChannel.join();
	}
}