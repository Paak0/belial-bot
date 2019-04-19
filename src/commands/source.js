const request = require('superagent');

module.exports = {
	name: 'source',
	help: 'Search for source of an image. [gib image]',
	alias: ['sauce'],
	run: (bot, msg , words) => {
		if( !msg.attachments.first() && !msg.embeds[0] && !words[1]) return console.log('No img.');
		
		let imageUrl;
		if(msg.attachments.first()) imageUrl = msg.attachments.first().url;
		else if(words[1] && words[1].startsWith('http')) imageUrl = words[1];
		else if(msg.embeds[0]) imageUrl = msg.embeds[0].url;
		else return console.log('No img.');
		
		if( !imageUrl ) return console.log('No img.');
		
		let url = 'https://saucenao.com/search.php?output_type=2&numres=5&minsim=80&url=' + imageUrl;

		request.post(url).then( r => {
			console.log(r);
			if(!r.body.results) return console.log('No results.');
			let sauce = r.body.results.filter( s => {return s.header.similarity > 80;} );
			if(sauce.length < 1){
				msg.channel.send(`No results.`);
			}else{
				msg.channel.send(`
**SauceNAO:**\n${sauce.map( (s, index) => `**${++index}.** Accuracy: ${s.header.similarity}% ${s.data.ext_urls[0]}`).join('\n')}
				`);
			}
		}).catch( e => console.log(e) );
	}
}