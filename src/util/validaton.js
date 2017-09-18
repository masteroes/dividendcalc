var validationConstants = require('../../config').validationConstants;

var inputValidator = function(inputValue) {
    var errors = null;
    if (!inputValue) {
        errors = {
            required: true
        }
    } else {
        var isValid = validationConstants.REGEX_BETS.test(inputValue) || validationConstants.REGEX_RESULT.test(inputValue);
        if (!isValid) {
            errors = {
                wrongFormat: inputValue
            }
        }
    }
    return errors;
}
module.exports=inputValidator;