module.exports.pattern = '^.?@%me% .+';

module.exports.main = function(twi, data, cfg){

	console.log('ENTETSUBUS called');

	var BOT_ID = cfg.my_screen_name;
	var twUserId = data.user.screen_name;
	var keyword = data.text.replace(new RegExp('^.?@' + BOT_ID + ' '), '');

	var days = ['日','月','火','水','木','金','土'];
	var day = days[(new Date()).getDay()];
	var isWeekend = '';
	var isHoliday = require('./japanese.holiday.js');

	switch(day){
		case '日':
		case '土':
			isWeekend = '土日祝日';
			break;
		case '月':
		case '火':
		case '水':
		case '木':
		case '金':
			var date = new Date();
			if( isHoliday(date.getFullYear(), date.getMonth()+1, date.getDay(), true) )
				isWeekend = '土日祝日';
			else
				isWeekend = '月～金';
			break;
	}

	//keywordで検索した結果がコールバック関数の引数resultとして返ってきます
	//[六間坂上] 浜松駅行 16:51ゆ | 17:00ゆ | 17:02(下)尾 |　17:03(下)常　| 17:04ゆ | 17:14ゆ
	search(keyword, function(result){
		if(result.length == 0 || result === undefined){
		 	return;
		}else{
			var replyStr = '@' + twUserId + ' [' +  result[0]  + '] ' + result[2] + '行';
			var dateStr = result[6].shift();
			while(result[6].length > 0 && (replyStr + dateStr).length <= 134 ){
				replyStr += ' | ' + dateStr;
				dateStr = result[6].shift();
			}
			if(result[6].length > 0)
				replyStr += '　' + result[6].length + '件省略';
		}

		twi.updateStatus(replyStr, function (error,data) {
			if(!(error && error.statusCode)){
				console.log('@omedetebot: ' + replyStr 'tweeted.');
				console.log('updateStatus done');
			}else{
				console.log(error);
				console.log('updateStatus failed');
			}
		});
	});	

	//指定したキーワードを含むバス停から出発するバスの行き先ごとの-10分~+20分までの時刻を検索
	//keyword=六間坂上:
	function search(keyword, callback) {

		require('date-utils');
		var csv = require('ya-csv');
		var reader = csv.createCsvFileReader('./commands/entetsu/entetsubus.csv');
		var data = [];

		reader.on('data', function(record) {
			data.push(record);
		}).on('end', function() {
			var result = [];
			//現在時刻
			var currentDate = new Date();
			var currentHour = currentDate.getHours();
			var currentMinute = currentDate.getMinutes();
			//一致したものをresultにつめて
			for(var i = 1; i < data.length; i++){
				if( !(new RegExp('' + keyword.replace(/\W/g,'\\$&') + '').test(data[i][0])) ) continue; // バス停フィルタ
				if( data[i][5] != isWeekend ) continue; // 曜日フィルタ
				if( data[i][3] < currentHour || data[i][3] > currentHour+2) continue; // 時間フィルタ
				result.push(data[i]);
			}
			//時・分を時刻に展開して経由地をくっつけて
			for(var i = 0; i < result.length; i++){
				var newDate = result[i][4].split(' ').map(function(str){
					return result[i][3] + ':' + str + result[i][1][0];
				});
				result[i].push(newDate); // result[i][6]
			}
			//マージして
			for(var i = result.length-1; i > 0; i--){
				Array.prototype.push.apply(result[0][6],result[i][6]);
				result.pop();
			}
			//ソートして重複消して
			result[0][6].sort().filter(function (x, i, self) {
				return self.indexOf(x) === i;
			});
			//現在時刻以前のものは削除して
			var currentDateStr = currentHour + ':' + currentMinute;
			for(var i = 0; i < result[0][6].length; i++){
				if(result[0][6][i] > currentDateStr){
					result[0][6].splice(0,i);
					break;
				}
			}
			//進捗どうですか
			// console.log(result);
			//コールバック！
			callback(result[0]);
		});
	};

};	