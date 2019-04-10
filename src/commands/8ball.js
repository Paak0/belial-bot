const request = require('superagent');

module.exports = {
	name: '8ball',
	help: 'Find the answers to your questions.',
	alias: [],
	run: (bot, msg) => {
		request.get('https://8ball.delegator.com/magic/JSON/0').then( (result) => {
			let answer = JSON.parse(result.text);
			return msg.channel.send(answer.magic.answer);
		}).catch( e => { console.log(e) });
	}
}