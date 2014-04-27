module.exports.pattern = 'お?めで[(たい)(てー)]な?';

module.exports.main = function(twi, data, cfg){

	var BOT_ID = cfg.my_screen_name;
	var twUserId = data.user.screen_name;
	var replyStr = 'おめでてー！';

	if( twUserId == BOT_ID ) return;
	twi.updateStatus('@' + twUserId + ' ' + replyStr + '', function (err,data) {
		if(!err) console.log('update_status done');
		else console.log('update_status failed');
	});

};