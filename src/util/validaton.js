var validationConstants = require('../../config').validationConstants;

var inputValidator = function(inputValue) {
    return function(inputValue) {
        var errors = null;
        if (!inputValue) {
            errors = {
                required: true
            }
        } else {
            var isValid = inputValue.test(validationConstants.REGEX_BETS) && inputValue.test(validationConstants.REGEX_RESULT);
            if (!isValid) {
                errors = {
                    wrongFormat: true
                }
            }
        }
        return errors;
    };
}
module.exports=inputValidator;