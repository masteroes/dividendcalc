var productConstants = require('../../config').productConstants;
/**
 * Check for second place for PLACE product
 * @param bet
 * @param raceResults
 * @returns {boolean}
 */
var secondPlaceRule=function(bet,raceResults){

    var selectionFlag=false;
    if(raceResults && bet){
        selectionFlag= bet.type ===productConstants['PLACE'].productType && bet.selections[0]===raceResults.second;
    }
    return selectionFlag;
};
module.exports=secondPlaceRule;