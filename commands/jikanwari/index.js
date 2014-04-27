module.exports.pattern = '^.?@%me% .+';

module.exports.main = function(twi, data, cfg){

	console.log('JIKANWARI called');

	var BOT_ID = cfg.my_screen_name;
	var twUserId = data.user.screen_name;
	var keyword = data.text.replace(new RegExp('^.?@' + BOT_ID + ' '), '');

	var terms = ['前期','後期'];
	var term = '前期';//hard-cording TODO
	var days = ['日','月','火','水','木','金','土'];
	var day = days[(new Date()).getDay()] + '曜';

	//keywordで検索した結果がコールバック関数の引数resultとして返ってきます
	search(keyword, function(result){
		if(result.length == 0){
			return;
//			replyStr = '@' + twUserId + ' その授業は別の講義または曜日だよ！';
		}else{
			var replyStr = '@' + twUserId + ' ' + term + ' ' + day + '';
			var part = result.shift();
			while(part !== undefined && (replyStr + part).length < 138 ){
				replyStr += ' | ' + part;
				console.log(part);
				part = result.shift();
			}
			if(result.length > 0)
				replyStr += 'ほか';
		}

		twi.updateStatus(replyStr, function (error,data) {
			if(!(error && error.statusCode)){
				console.log('updateStatus done');
			}else{
				console.log(error);
				console.log('updateStatus failed');
			}
		});
	});	

	function search(keyword, callback) {

		var csv = require('ya-csv');
		var reader = csv.createCsvFileReader('./commands/jikanwari/jikanwari.csv');
		var data = [];

		reader.on('data', function(record) {
			data.push(record);
		}).on('end', function() {
			var result = [];
			//一致したものをresultにつめて
			for(var i = 1; i < data.length; i++){
				if( data[i][3] != term) continue; // 学期フィルタ
				if( data[i][4] != day ) continue; // 曜日フィルタ
				if( (new RegExp('' + keyword.replace(/\W/g,'\\$&') + '').test(data[i][0])) ){
					result.push(data[i][0]+' '+data[i][1]+' '+data[i][2]+' '+data[i][5]+
					' '+data[i][6]);
					console.log(data[i][0]+' match');
				}
			}
			//コールバック！
			callback(result);
		});
	};

};	