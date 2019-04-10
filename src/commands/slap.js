const Jimp = require('jimp');

module.exports = {
	name: 'slap',
	help: 'Slap someone.',
	alias: [],
	run: (bot, msg) => {
		let mention = msg.mentions.users.first() || null;
		if(!mention) return msg.reply(`You just wasted 1 slap. Think about your existance. ${bot.emojis.find(emoji => emoji.name === 'kannaangry2')}`);
			
		let bg = 'https://i.imgur.com/1wevUnK.jpg';
		let img1 = msg.author.displayAvatarURL;
		let img2 = mention.displayAvatarURL;
		Jimp.read(img2).then( function(front2){
			front2.rotate(30);
			front2.resize(120, 120);
			Jimp.read(img1).then( function(front1){
				front1.resize(100, 100);
				Jimp.read(bg).then( function(back){
					back.composite(front2, 60, 280).composite(front1, 220, 140).getBuffer(Jimp.MIME_JPEG, (e, buffer) => {
						if(e) return console.log(e.stack);
						msg.channel.send({ files: [{ attachment: buffer, name: 'slapped.jpg' }] }).then( () => {
							if(mention.username === 'Belial') msg.channel.send(`MY INNER MASOCHISM IS SCREAMING!!!\nUHOOHOHOHOHOHOOOHOOOOOO!!!`);
						});
					});
				});
			});
		});
	}
}