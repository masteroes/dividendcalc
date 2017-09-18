var validationConstants= {
        REGEX_BETS : '/(Bet:)[A-Z]:[0-9](,[0-9])?:[0-9]+/g',
        REGEX_RESULT :  '/(Result:)[0-9]:[0-9]:[0-9]/g',
        COLON_DELIMITER :  ':',
        COMMA_DELIMITER :  ','
};
var productConstants= {
        WIN :  {productType:'W',commission:15,share:1},
        PLACE :  {productType:'P',commission:12,share:3},
        EXACTA :  {productType:'E',commission:18,share:1}
};
module.exports.decimalPlaces=2;
module.exports.validationConstants= validationConstants;
module.exports.productConstants= productConstants;
