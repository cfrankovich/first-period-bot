const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

function getToken()
{
	let data = fs.readFile('TOKEN.txt', {encoding: 'utf-8', flag: 'r'}, function (err, data){
		if (err) { return console.log(err); }
		console.log(data);
	});
	return data;
}

client.once('ready', () => {
	client.user.setActivity('<help', {type: 'WATCHING'}).catch(console.error);
});

client.on('message', (message) => {

	if (!message.content.startsWith(prefix) || message.content.startsWith('<:') || message.author.bot || message.content.substring(1, 2) === '@') return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	switch(command)
	{
		case 'test':
			message.channel.send("test 123");
			return;
	}

});

client.login(getToken());
