
var fs = require('fs');
var ntwitter = require('ntwitter');
var cfg = require('./config.js');

var commands = [];

console.log('Vaild commands: ');

fs.readdirSync('commands').filter(function(commandName){
	return !(commandName == '.DS_Store');
}).forEach(function(commandName){
	console.log(commandName);
	commands.push(
		require('./commands/' + commandName)
	);
});

var twi = new ntwitter({
	'consumer_key': cfg.consumer_key, 
	'consumer_secret': cfg.consumer_secret, 
	'access_token_key': cfg.access_token_key, 
	'access_token_secret': cfg.access_token_secret
});

twi.get('/account/verify_credentials.json', function(err, res){
	if(!err){
		cfg.my_screen_name = res.screen_name;
		console.log('You are: @' + cfg.my_screen_name);
		twi.stream('user', function(stream){
			stream.on('data', function(data){
				if('text' in data && !('retweeted_status' in data)){
					commands.forEach(function(command){
						if(data.text.match(new RegExp(command.pattern.replace(/%me%/g, cfg.my_screen_name), 'gi'))){
							command.main(twi, data, cfg);
						}
					});	
				}
			});
		});
	}else{
		console.error(err);
	}
});
