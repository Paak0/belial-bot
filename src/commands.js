const request = require('superagent');
const fetch = require('node-fetch');
const Jimp = require('jimp');
const belial = require('./belial.js');

module.exports = {
	// 'play': {
		// name: 'play',
		// desc: 'Play first song on list.',
		// dothis: function(msg){
			
		// }
	// },
	
	// 'skip': {
		// name: 'skip',
		// desc: 'Skip current playing song.',
		// dothis: function(msg){
			
		// }
	// },
	
	// 'anime': {
		// name: 'anime',
		// desc: 'Look for anime source.',
		// dothis: function(msg){
			// let imageurl = msg.attachments.first().url || msg.embeds[0].image.url || words[1] || 0;
			
			// Jimp.read(imageurl).then( img => {
				// img.getBase64Async(img.getMIME()).then( res => {
					// fetch('https://trace.moe/api/search', {
						// method: 'POST',
						// body: JSON.stringify({ image: res }),
						// headers: { 'Content-Type': 'application/json' }
					// })
					// .then( res => res.json() )
					// .then( r => {
						// msg.channel.send({ "embed": {
							// "title": r.docs[0].title_romaji || '-???-',
							// "description": `Episode: ${r.docs[0].episode} || ?,  Time: ${Math.floor(r.docs[0].at/3600)}:${Math.floor(r.docs[0].at/60)}:${Math.floor(r.docs[0].at % 60)}\n
											// [MAL](https://myanimelist.net/anime/${r.docs[0].mal_id})  [ANILIST](https://anilist.co/anime/${r.docs[0].anilist_id})`,
							// "thumbnail": {
								// "url": `https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/${r.docs[0].anilist_id}.jpg`
							// },
							// "author": {
								// "name": r.docs[0].title_native || '-???-',
								// "url": `https://myanimelist.net/anime/${r.docs[0].mal_id}`
							// }
						// }});
					// })
					// .catch(e => {
						// console.log(e.stack);
						// msg.channel.send(`Nothing.`);
					// });
					
				// });
			// }).catch(e => console.log(e.stack));
		// }
	// }
}