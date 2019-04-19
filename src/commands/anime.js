const fetch = require('node-fetch');
const Jimp = require('jimp');

module.exports = {
	name: 'anime',
	help: 'Search sauce for anime. [gib image]',
	alias: [],
	run: (bot, msg, words) => {
		if( !msg.attachments.first() && !msg.embeds[0] && !words[1]) return console.log('No img.');
		
		let imageUrl;
		if(msg.attachments.first()) imageUrl = msg.attachments.first().url;
		else if(words[1] && words[1].startsWith('http')) imageUrl = words[1];
		else if(msg.embeds[0]) imageUrl = msg.embeds[0].url;
		else return console.log('No image.');
		
		if(!imageUrl) return msg.channe.send(`No image.`);
		
		Jimp.read(imageUrl).then( img => {
			img.getBase64Async(img.getMIME()).then( res => {
				fetch('https://trace.moe/api/search', {
					method: 'POST',
					body: JSON.stringify({ image: res }),
					headers: { 'Content-Type': 'application/json' }
				})
				.then( res => res.json() )
				.then( r => {
					msg.channel.send({ "embed": {
						"title": r.docs[0].title_romaji,
						"description": `Episode: ${r.docs[0].episode},  Time: ${Math.floor(r.docs[0].at/3600)}:${Math.floor(r.docs[0].at/60)}:${Math.floor(r.docs[0].at % 60)}\n
										[MAL](https://myanimelist.net/anime/${r.docs[0].mal_id})  [ANILIST](https://anilist.co/anime/${r.docs[0].anilist_id})`,
						"thumbnail": {
							"url": `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/${r.docs[0].anilist_id}.jpg`
						},
						"author": {
							"name": r.docs[0].title_native,
							"url": `https://myanimelist.net/anime/${r.docs[0].mal_id}`
						}
					}});
				})
				.catch(e => {
					console.log(e);
					return msg.channel.send(`Nothing.`);
				});
			});
		}).catch(e => console.log(e));
	}
}