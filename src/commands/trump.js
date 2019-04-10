const request = require('superagent');

module.exports = {
	name: 'trump',
	help: 'Random tweet from President Donald Trump.',
	alias: [],
	run: (bot, msg) => {
		request.get('https://api.tronalddump.io/random/quote').then( (result) => {
			let thonk = JSON.parse(result.text);
			return msg.channel.send({ "embed": {
				"title": thonk.tags[0] || 'No tag',
				"description": thonk.value || 'Nothing',
				"timestamp": thonk.appeared_at || 'No date',
				"thumbnail": {
					"url": "https://upload.wikimedia.org/wikipedia/commons/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg" || ''
				},
				"author": {
					"name": "Trump's thought",
					"url": thonk._embedded.source[0].url || ''
				}
			}});
		}).catch( e => { return console.log(e) });
	}
}