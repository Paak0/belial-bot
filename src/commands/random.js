module.exports = {
	name: 'random',
	help: 'Get random number. [default 0-10]',
	alias: ['rnd', 'rand'],
	run: (bot, msg) => {
		let args = msg.content.split(' ');
		let min = args.length > 2 && !isNaN( Number(args[1]) ) ? parseInt(args[1]) : 0;
		let max = !isNaN( Number(args[2]) ) || !isNaN( Number(args[1]) ) ? parseInt(args[2]) || parseInt(args[1]) : 11;
		let randomNumber = Math.floor( Math.random()*(max - min) + min );
		return msg.channel.send(`Your number: ${randomNumber}`);
	}
}