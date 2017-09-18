var chai = require('chai');
var expect = chai.assert;
var testData =
    [
        {type:'W',selections:[2],stake:10},
        {type:'W',selections:[3],stake:10},
        {type:'W',selections:[1],stake:30}
    ]
var selectionRule = require('../../../src/rules/winRule.js');
var results = require('../../../src/models/Result.js');
productConstants = require('../../../config.js').productConstants;
var winResult = new results(2, 3, 1);
var dividendCalculatorService = require('../../../src/services/dividendCalculatorService.js');//(productConstants.WIN, selectionRule, winResult);

describe('dividendCalculatorService', function () {
    var dc=dividendCalculatorService(productConstants.WIN, selectionRule, winResult);
    console.log("testData_________________" ,dc.calculateDividends(testData));
    it('should return expected dividends for WIN Products', function () {
        //total Stake=50 Commision less 7.5 , pool after commision =42.5
        //42.5/10=42.5
        expect.equal('4.25', dc.calculateDividends(testData));
    });
});

