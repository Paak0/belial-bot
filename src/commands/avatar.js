module.exports = {
	name: 'avatar',
	help: 'Show yours or mentioned person\'s avatar. [only first mention]',
	alias: ['ava'],
	run: (bot, msg) => {
		let user = msg.mentions.users.first() || msg.author || 0;
		if(!user) return;
		msg.channel.send( {'embed':{
				'image':{ 'url': user.displayAvatarURL } 
			} 
		});
		
		if( user.username != 'Belial' && Math.random() < 0.4 ){
			let rand = Math.floor( Math.random() * bot.belial.messages.length );
			msg.channel.send(  user +' '+ bot.belial.messages.find( (elem, index) => { return index === rand; } ) );
		}
	}
}