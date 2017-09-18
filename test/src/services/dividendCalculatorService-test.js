var chai = require('chai');
var expect = chai.assert;
var winTestData =
    [
        {type:'W',selections:[2],stake:10},
        {type:'W',selections:[3],stake:10},
        {type:'W',selections:[1],stake:30}
    ];
var placeTestData =
	[
		{type:'P',selections:[2],stake:10},
		{type:'P',selections:[3],stake:20},
		{type:'P',selections:[1],stake:30}
	];
var exactaTestData =
	[
		{type:'E',selections:[2,3],stake:10},
		{type:'E',selections:[2,1],stake:20},
		{type:'E',selections:[1,2],stake:30}
	];
var selectionRule = require('../../../src/rules/winRule.js');
var firstPlaceRule = require("../../../src/rules/firstPlaceRule.js");
var secondPlaceRule = require("../../../src/rules/secondPlaceRule.js");
var thirdPlaceRule = require("../../../src/rules/thirdPlaceRule.js");
var exactaRule = require("../../../src/rules/exactaRule.js");

var results = require('../../../src/models/Result.js');
productConstants = require('../../../config.js').productConstants;
var dividendCalculatorService = require('../../../src/services/dividendCalculatorService.js');

describe('dividendCalculatorService Place ', function () {
	var winResult = new results(2, 3, 1);
	var Place1dc=dividendCalculatorService(productConstants.PLACE, firstPlaceRule, winResult);
	it('should return expected dividends for 1st PLACE Products', function () {
		//total Stake=50 Commision less 7.5 , pool after commisionand 3 patrts =42.5/3=14.1666..
		//14.166.../10=1.47
		expect.equal('1.76', Place1dc.calculateDividends(placeTestData));
	});
	var Place2dc=dividendCalculatorService(productConstants.PLACE, secondPlaceRule, winResult);
	it('should return expected dividends for 2nd PLACE Products', function () {
		//total Stake=60 Commision less 7.5 , pool after commisionand 3 patrts =42.5/3=14.1666..
		//14.166.../10=1.47
		expect.equal('0.88', Place2dc.calculateDividends(placeTestData));
	});
});
describe('dividendCalculatorService WIN', function () {
	var winResult = new results(2, 3, 1);
	var WinDc=dividendCalculatorService(productConstants.WIN, selectionRule, winResult);
	it('should return expected dividends for WIN Products', function () {
		//total Stake=60 Commision less 7.5 , pool after commision =42.5
		//42.5/10=42.5
		expect.equal('4.25', WinDc.calculateDividends(winTestData));
	});

});

describe('dividendCalculatorService EXACTA', function () {
	var winResult = new results(2, 3, 1);
	var WinDc=dividendCalculatorService(productConstants.EXACTA, exactaRule, winResult);
	it('should return expected dividends for Exacta Products', function () {
		//total Stake=50 Commision less 7.5 , pool after commision =42.5
		//42.5/10=42.5
		expect.equal('4.92', WinDc.calculateDividends(exactaTestData));
	});

});

