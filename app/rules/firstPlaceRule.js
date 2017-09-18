var productConstants = require('../../config').productConstants;
/**
 * Check for First Place in Results
 * @param bet
 * @param raceResults
 * @returns {boolean}
 */
var firstPlaceRule = function (bet, raceResults) {

	var selectionFlag = false;
	if (raceResults && bet) {
		selectionFlag = bet.type === productConstants['PLACE'].productType && bet.selections[0] === raceResults.first;
	}
	return selectionFlag;
};
module.exports = firstPlaceRule;