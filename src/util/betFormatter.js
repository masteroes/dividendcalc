var deliMeterConstant = require('../../config').validationConstants;
var logger = require("../../defaultLogger.js");
var results = require("../models/Result.js");
var bets = require("../models/Bet.js");


'use strict';

/**
 * Formats Arrays of String in required format
 * String should be already validated
 * @returns {BetFormatter}
 * @constructor
 */
function BetFormatter() {
    var _self = this;
    var formattedObject = null;

    /**
     * Gets selections from comma separated selection
      * @param selections
     * @returns {Array}
     * @private
     */
    function _getSelections(selections) {
        var splitSelections = [];
        selections = selections.split(deliMeterConstant.COMMA_DELIMITER);
        for (var i = 0; i < selections.length; i++) {
            splitSelections.push(+selections[i]);
        }
        return splitSelections;
    };

    /**
     * Formats a bets in Bet object , slitting colons and commas
     * @param inputData
     * @private
     */
    function _formatsBets(inputData) {
        logger.info("inputData.length " + inputData.length);

        for (var i = 0; i < inputData.length; i++) {
            var bet = inputData[i];
            var Bet = new bets(bet.split(deliMeterConstant.COLON_DELIMITER)[1], _getSelections(bet.split(deliMeterConstant.COLON_DELIMITER)[2]),
                parseFloat(bet.split(deliMeterConstant.COLON_DELIMITER)[3])
            );
            formattedObject.Bets.push(Bet);
        }
    }

    /**
     * Formats a result by removing Colon and creates Result Object
     * @param result
     * @private
     */
    function _formatsResult(result) {
        var Result = new results(
            +result.split(deliMeterConstant.COLON_DELIMITER)[1],
            +result.split(deliMeterConstant.COLON_DELIMITER)[2],
            +result.split(deliMeterConstant.COLON_DELIMITER)[3]);
        formattedObject.Result = Result;
    }

    /*
     * Public function
     * Parses and formats object using regex operations
     * Returns a formatted/parsed object
     */
    _self.getFormattedBets = function (inputData) {
        formattedObject = {
            Bets: [],
            Result: null
        };
        var resultData = inputData.pop();
        logger.info("bets", inputData);
        _formatsBets(inputData);
        _formatsResult(resultData);

        return formattedObject;
    };

    return _self;

}

module.exports = BetFormatter;