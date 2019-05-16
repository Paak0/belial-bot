const request = require('superagent');

let soundNames = ['them', 'us', 'ability_them', 'ability_us', 'mypage', 'cutin', 
				  'win', 'lose', 'attack', 'kill', 'ready', 'mortal', 'damage', 
				  'dying', 'zenith_up', 'runk_up', 'introduce', 'evolution', 'formation', 
				  'archive', 'to_player', 'healed', 'helaled', 'hp_down', 'power_down', 'player_gauge', 'special'];
let adds = ['', 'a', 'b', '_a', '_b', '_mix'];
let sounds = [];
let iterations = 4;
let max = soundNames.length * (iterations - 1) * (adds.length + 1);
let counter = 0; //486 max   27x3x6

module.exports = {
	name: 'gbftest',
	help: 'Not for you',
	alias: [],
	run: (bot, msg, words) => {
		if(msg.author.id != '324531038275633153') return msg.channel.send(`You aren't my master.`);
		
		sounds = [];
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
							console.log(counter+'. added: '+soundNames[i]);
						}
					}).catch( e => { 
						counter++;
						console.log(counter);
					});
				}	
			}
		}
		
		for(let i = 0; i < soundNames.length; i++){
			for(let j = 1; j < 4; j++){
				request.head('http://game-a5.granbluefantasy.jp/assets/sound/voice/'+ words[1] +'_'+soundNames[i]+'0'+j+'.mp3').then( res => {
					counter++;
					console.log(counter);
					if(!sounds.includes(soundNames[i])){
						sounds[i] = soundNames[i];
						console.log('added: '+soundNames[i]);
					}
				}).catch(e => {
					counter++;
					console.log(counter);
					if(counter === 567){
						console.log('done...');
						msg.channel.send(`\[${sounds.map( (s, index) => `\'${s}\'`).join(', ')}, \'other\'\]`);
					}
				});
			}
		}
	}
}
