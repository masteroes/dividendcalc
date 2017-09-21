var validationConstants = {
	REGEX_BETS: /(Bet:)[A-Z]:[0-9](,[0-9])?:[0-9]+/,
	REGEX_RESULT: /(Result:)[0-9]:[0-9]:[0-9]/,
	COLON_DELIMITER: ':',
	COMMA_DELIMITER: ',',
	"DOLLAR_SIGN": '$'
};
var productConstants = {
	WIN: {name: 'Win', productType: 'W', commission: 15, share: 1},
	PLACE: {name: 'Place', productType: 'P', commission: 12, share: 3},
	EXACTA: {name: 'Exacta', productType: 'E', commission: 18, share: 1}
};
module.exports.decimalPlaces = 2;
module.exports.validationConstants = validationConstants;
module.exports.productConstants = productConstants;
