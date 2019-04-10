const request = require('superagent');

module.exports = {
	name: 'wisdom',
	help: 'Random advice for life.',
	alias: [],
	run: (bot, msg) => {
		request.get('https://api.adviceslip.com/advice').then( (result) => {
			let wise = JSON.parse(result.text);
			return msg.channel.send(wise.slip.advice);
		}).catch( e => { return console.log(e) });
	}
}