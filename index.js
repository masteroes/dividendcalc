var testData = require("./src/testData/config.json");
var betFormatter=require("./src/util/betformatter.js")
var dc = require("./src/services/dividendCalculatorService.js");
var readline = require('readline');
var winRule=require("./src/util/winRule.js");
var firstPlaceRule=require("./src/util/firstPlaceRule.js");
var secondPlaceRule=require("./src/util/secondPlaceRule.js");
var thirdPlaceRule=require("./src/util/thirdPlaceRule.js");
var exactaRule=require("./src/util/exactaRule.js");

var validators = require('./src/util/validaton.js');
var logger=require("./defaultLogger.js");
var productConstants = require('./config').productConstants;

var arr = [];

// var reader=readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
// });
// reader.prompt();
//
// reader.on('line', function (line) {
//     console.log(line.indexOf('Result')+" "+line.indexOf('Bet'))
//     if(line.indexOf('Result') === -1 || line.indexOf('Bet') !== -1)
//     {
//         reader.close();
//     }
//     else{
//         console.log(line.indexOf('Result')+" "+line.indexOf('Bet'))
//         arr.push(line);
//         reader.prompt();
//
//     }
// });
var Bets=betFormatter();
var betsAndResult=Bets.getFormattedBets(testData.testData);
logger.info("resultPart ",betsAndResult.Result);

var dCalcWin = new dc(productConstants.WIN, winRule, betsAndResult.Result);
console.log("DC WIN" + JSON.stringify(dCalcWin.calculateDividends(betsAndResult.Bets)));

var dCalcPlace1 = new dc(productConstants.PLACE, firstPlaceRule, betsAndResult.Result);
console.log("DC PLACE1" + JSON.stringify(dCalcPlace1.calculateDividends(betsAndResult.Bets)));

var dCalcPlace2 = new dc(productConstants.PLACE, secondPlaceRule, betsAndResult.Result);
console.log("DC PLACE2" + JSON.stringify(dCalcPlace2.calculateDividends(betsAndResult.Bets)));

var dCalcPlace3 = new dc(productConstants.PLACE, thirdPlaceRule, betsAndResult.Result);
console.log("DC PLACE3" + JSON.stringify(dCalcPlace3.calculateDividends(betsAndResult.Bets)));


var dCalcExacta = new dc(productConstants.EXACTA, exactaRule, betsAndResult.Result);
console.log("DC EXACTA " + JSON.stringify(dCalcExacta.calculateDividends(betsAndResult.Bets)));
