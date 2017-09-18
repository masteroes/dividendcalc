var productConstants = require('../../config').productConstants;
module.exports = function (bet, raceResults) {

	var selectionFlag = false;
	if (raceResults && bet) {
		selectionFlag = bet.type === productConstants['WIN'].productType && bet.selections[0] === raceResults.first;
	}
	return selectionFlag;
};