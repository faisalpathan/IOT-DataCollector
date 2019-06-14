const moment = require('moment');
const thermometerData = require('./THERM0001.json');


let futureYearDateInUnix = moment(thermometerData[0].ts).add(1, 'Y').unix();
futureYearDateInUnix = Number(futureYearDateInUnix.toString() + '000')

function checkAndTransFormValues(currentJsonData) {
	if(currentJsonData.ts < futureYearDateInUnix){
		return { x: moment(currentJsonData.ts).format('YYYY-MM-DD'), y : currentJsonData.val }
	}
	return null;
}

module.exports.checkAndTransFormValues = checkAndTransFormValues;
