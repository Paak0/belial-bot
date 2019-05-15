const request = require('superagent');

let soundNames = ['them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 
				  'win', 'lose', 'attack', 'kill', 'ready', 'mortal', 'damage', 
				  'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 'formation', 
				  'archive', 'to_player', 'healed', 'helaled', 'hp_down', 'power_down', 'player_gauge', 'special'];
let adds = ['', 'a', 'b', '_a', '_b', '_mix'];

module.exports = {
	name: 'gbftest',
	help: 'Not for you',
	alias: [],
	run: (bot, msg, words) => {
		if(msg.author.id != '324531038275633153') return msg.channel.send(`You aren't my master.`);
		
		let sounds = [];
		let iterations = 4;
		let counter = 0; //486 max   27x3x6
		let max = soundNames.length * (iterations - 1) * adds.length;
		console.log('id: '+words[1]);
		console.log('max: '+max);
		
		for(let i = 0; i < soundNames.length; i++){
			for(let j = 1; j < iterations; j++){
				for(let k = 0; k < adds.length; k++){
					let link = words[1]+'_'+soundNames[i]+j+adds[k]+'.mp3';
					request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/'+link).then( res => {
						counter++;
						console.log(counter);
						if(!sounds.includes(soundNames[i])){
							sounds[i] = soundNames[i];
							console.log('added: '+soundNames[i]);
						}
						if(counter === max){
							console.log('done...');
							return console.log(sounds);
						}
					}).catch( e => { 
						counter++;
						console.log(counter);
						return 0; 
					});
				}	
			}
		}
		
		
		// for(let i = 0; i < soundNames.length; i++){
			// for(let j = 1; j < iterations; j++){
				// for(let k = 0; k < adds.length; k++){
					// let link = words[1]+'_'+soundNames[i]+j+adds[k]+'.mp3';
					// request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/'+link).then( res => {
						// if(!sounds.includes(soundNames[i])){
							// sounds[i] = soundNames[i];
							// console.log(sounds);
						// }
						// j = iterations;
						// k = adds.length;
						// if(i === soundNames.length - 1){
							// console.log('done...');
							// console.log(sounds);
						// }
					// }).catch( e => { return 0; });
				// }	
			// }
		// }
		
	}
}