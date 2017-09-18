var productConstants = require('../../config').productConstants;
/**
 * Checks for third place in PLACE products
 * @param bet
 * @param raceResults
 * @returns {boolean}
 */
var thirdPlaceRule=function(bet,raceResults){

    var selectionFlag=false;
    if(raceResults && bet){
        selectionFlag= bet.type ===productConstants['PLACE'].productType && bet.selections[0]===raceResults.third;
    }
    return selectionFlag;
};
module.exports=thirdPlaceRule;