module.exports = {
	name: 'info',
	help: 'Show informations about person.',
	alias: [],
	run: (bot, msg) => {
		let mbr = msg.mentions.members.first() || msg.member || 0;
		if(!mbr) return;
		msg.channel.send( {"embed": {
			"color": mbr.displayColor,
			"thumbnail": { "url": mbr.user.displayAvatarURL },
			"author": { "name": mbr.user.username },
			"fields": [
				{	"name": "ID",
					"value": mbr.user.id },
				{	"name": "Status",
					"value": mbr.user.presence.status },
				{	"name": "Nickname",
					"value": mbr.nickname || "none" },
				{	"name": "Account created",
					"value": mbr.user.createdAt },
				{	"name": "Joined",
					"value": mbr.joinedAt },
				{	"name": "Roles",
					"value": "soonTM" }
			]
		}}).catch( e => { return console.log(e.stack); } );
	}
}