var productConstants = require('../../config').productConstants;
/**
 * This rule is for Exacta Which Check Results for first and scond place from bet selection
 * @param bet
 * @param raceResults
 * @returns {boolean}
 */
var exactaRule = function (bet, raceResults) {

    var selectionFlag = false;
    if (raceResults && bet) {
        selectionFlag = bet.type === productConstants['EXACTA'].productType &&
            bet.selections[0] === raceResults.first &&
            bet.selections[1] === raceResults.second;
    }
    return selectionFlag;
};
module.exports = exactaRule;