var betFormatter = require("./src/util/betformatter.js");
var dc = require("./src/services/dividendCalculatorService.js");
var readline = require('readline');
var winRule = require("./src/rules/winRule.js");
var firstPlaceRule = require("./src/rules/firstPlaceRule.js");
var secondPlaceRule = require("./src/rules/secondPlaceRule.js");
var thirdPlaceRule = require("./src/rules/thirdPlaceRule.js");
var exactaRule = require("./src/rules/exactaRule.js");

var logger = require("./defaultLogger.js");
var config = require('./config');
var productConstants = config.productConstants;
var delimeter = config.validationConstants;

var InputData = [];
var Bets = betFormatter();

var reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true
});
console.log('Usage Bet:<W/P/E>:<selection[,selection]>:<stake>');
console.log('Usage Result:<first>:<second>:<third>');
reader.prompt(true);

reader.on('line', function (line) {
	InputData.push(line);
	if ((/Result/).test(line)) {
		reader.close();
	} else {
		reader.prompt(true);
	}

});

reader.on('close', function (line) {
	logger.info("InputData", InputData);
	var betsAndResult = Bets.getFormattedBets(InputData);
	var dCalcWin = new dc(productConstants.WIN, winRule, betsAndResult.Result);
	console.log(productConstants.WIN.name + delimeter.COLON_DELIMITER +
		betsAndResult.Result.first + delimeter.COLON_DELIMITER +
		delimeter.DOLLAR_SIGN + dCalcWin.calculateDividends(betsAndResult.Bets));

	var dCalcPlace1 = new dc(productConstants.PLACE, firstPlaceRule, betsAndResult.Result);
	console.log(productConstants.PLACE.name + delimeter.COLON_DELIMITER +
		betsAndResult.Result.first + delimeter.COLON_DELIMITER +
		delimeter.DOLLAR_SIGN + dCalcPlace1.calculateDividends(betsAndResult.Bets));

	var dCalcPlace2 = new dc(productConstants.PLACE, secondPlaceRule, betsAndResult.Result);
	console.log(productConstants.PLACE.name + delimeter.COLON_DELIMITER +
		betsAndResult.Result.second + delimeter.COLON_DELIMITER +
		delimeter.DOLLAR_SIGN + dCalcPlace2.calculateDividends(betsAndResult.Bets));

	var dCalcPlace3 = new dc(productConstants.PLACE, thirdPlaceRule, betsAndResult.Result);
	console.log(productConstants.PLACE.name + delimeter.COLON_DELIMITER +
		betsAndResult.Result.third + delimeter.COLON_DELIMITER +
		delimeter.DOLLAR_SIGN + dCalcPlace3.calculateDividends(betsAndResult.Bets));

	var dCalcExacta = new dc(productConstants.EXACTA, exactaRule, betsAndResult.Result);
	console.log(productConstants.EXACTA.name + delimeter.COLON_DELIMITER +
		betsAndResult.Result.first + delimeter.COMMA_DELIMITER + betsAndResult.Result.second + delimeter.COLON_DELIMITER +
		delimeter.DOLLAR_SIGN + dCalcExacta.calculateDividends(betsAndResult.Bets));

});
