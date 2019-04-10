module.exports = {
	name: 'list',
	help: 'Show songs in list. [ max 10 ]',
	alias: ['l', 'q', 'queue'],
	run: (bot, msg) => {
		if(!msg.member.voiceChannel) return msg.react('🔇');
		if (!bot.guilds.get(msg.guild.id).music.songs[0]) return msg.channel.send(`Nothing in list.`);
		let toSend = [];
		bot.guilds.get(msg.guild.id).music.songs.forEach( (song, i) => toSend.push(`${i+1}. ${song.title} ( ${song.duration} ) - added by: ${song.requester}`) );
		msg.channel.send(`__**Music Queue:**__ Currently **${toSend.length}** songs queued ${(toSend.length > 10 ? '*[Only next 10 shown]*' : '')}\n\`\`\`${toSend.slice(0, 10).join('\n')}\`\`\``);
	}
}