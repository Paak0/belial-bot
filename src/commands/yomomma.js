const request = require('superagent');

module.exports = {
	name: 'yomomma',
	help: 'Random yomomma joke.',
	alias: [],
	run: (bot, msg) => {
		request.get('http://api.yomomma.info/').then( (result) => {
			let joke = JSON.parse(result.text);
			return msg.channel.send(joke.joke);
		}).catch( e => { return console.log(e) });
	}
}