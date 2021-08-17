const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = '<';

function login()
{
	fs.readFile('TOKEN.txt', {encoding: 'utf-8', flag: 'r'}, function (err, data){
		if (err) { return console.log(err); }
		else
		{
			data = data.substring(0, data.length-1);
			client.login(data);
			return data;
		}
	});
}

function search(message, str, il)
{
	var found = [];
	fs.readFile('students.txt', {encoding: 'utf-8', flag: 'r'}, function (err, data) {
		if (err) { return console.log(err); }
		var lines = data.split('\n');
		var newlines = lines.filter(line => line.toLowerCase().includes(str));

		const embed = new Discord.MessageEmbed()
		.setTitle(`Search results containing "${str}"`)
		.setDescription(`Searched ${lines.length} records.`) 
		.setColor('#d4af37')
		.setTimestamp();

		for (var i = 0; i < newlines.length; ++i)
		{
			embed.addField(`Result #${i+1}`, newlines[i], il);
		}
		message.channel.send({ embeds: [embed] });
		return;
	});
}

client.once('ready', () => {
	console.log('Bot is online.');
	client.user.setActivity('<help', {type: 'WATCHING'});
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

		case 'help':
			message.channel.send('For help visit `https://github.com/cfrankovich/first-period-bot` and scroll down.');
			return;

		case 'find':
			if (args[0] == undefined) 
			{
				return message.channel.send('Usage: `<find [last or first name]`');
			}
			search(message, args[0].toLowerCase(), false);
			return;

		case 'room':
			// literally the same as find lol //
			if (args[0] == undefined) 
			{
				return message.channel.send('Usage: `<find [last or first name]`');
			}
			search(message, args[0].toLowerCase(), true);
			return;

	}

});

login();
