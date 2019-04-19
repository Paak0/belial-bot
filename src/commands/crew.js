const fetch = require('node-fetch');

module.exports = {
	name: 'crew',
	help: '',
	alias: ['gw'],
	run: (bot, msg, words) => {
		if(!words[1]) return msg.channel.send(`Gib crew name.`);
		
		let crewName = words[1];
		
		fetch('http://gbf.gw.lt/gw-guild-searcher/search', { 
			method: "POST", 
			body: JSON.stringify({"search": crewName})
		})
		.then( res => res.json() )
		.then( r => {
			if(r.result.length < 1) return msg.channel.send(`No results found.`);
			
			r.result.forEach( crew => {
				let gwNum = crew.data.length > 15 ? 15 : crew.data.length;
				let data = '';
				for(let i = 0; i < gwNum; i++){
					data += `\nGW \#${crew.data[i].gw_num}, rank: \#${crew.data[i].rank} with ${formatNum(crew.data[i].points)} points as ${crew.data[i].name}.`;
				}
				msg.channel.send({ "embed": {
					"description": data,
					"author": {
						"name": `${crew.data[0].name}`,
						"url": `http://game.granbluefantasy.jp/#guild/detail/${crew.id}`
					}
				}});
			});
			
		})
		.catch(e => console.log(e));
	}
}

function formatNum(n){
	return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}