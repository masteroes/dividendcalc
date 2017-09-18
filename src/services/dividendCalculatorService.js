var logger = require("../../defaultLogger.js");
var config = require('../../config');
var path = require("path");
var fs = require("fs");

/**
 * This service used product information , from configs, the selection rule function and race result object
 * @param product
 * @param selectionRule
 * @param raceResult
 * @returns dividendCalculatorService Object with public methods
 */
function dividendCalculatorService(product, selectionRule, raceResult) {
    logger.info("dividendCalculatorService START");

    this.product = product;
    this.selectionRule = selectionRule;
    this.raceResult = raceResult;

    /**
     * Private method to calculate summ of stakes for a particular
     * type of product
     * @param products
     * @param selectiontype
     * @returns poolTotal float
     */
    var _calculatePoolTotal = (products,selectionType)=>
    {
        var poolTotal = 0.0;
        products.forEach(function (product) {
            if(product.type===selectionType){
                poolTotal = poolTotal + product.stake;
            }
        });
        return poolTotal;
    }

    /**
     * Calculates dividends for all bets uses values at the time of object initialization
     * @param winningProducts
     * @returns {*}
     */
    var calculateDividends = (winningProducts)=>
    {
        logger.info("calculateDividends START");
        var product=this.product;
        //Get sum of all the stake of product

        var poolTotal = _calculatePoolTotal(winningProducts,product.productType);
        var afterCommissionStake = (poolTotal - (poolTotal * (product.commission / 100)))/product.share;
        logger.info("poolTotal " + poolTotal);
        logger.info("afterCommissionStake " + afterCommissionStake);

        var winningSelectedProducts = _calculateSelectionProducts(winningProducts, this.selectionRule, this.raceResult);
        var winnersTotalStake = _calculatePoolTotal(winningSelectedProducts,product.productType);
        logger.info("winningSelectedProducts " + winningSelectedProducts.length);
        logger.info("winnersTotalStake" + winnersTotalStake);
        return winnersTotalStake===0?1:(afterCommissionStake/winnersTotalStake).toFixed(config.decimalPlaces);
    }

    /**
     * private method to get selection products using selection rule
     * @param products
     * @param selectionRule
     * @param raceResult
     * @returns collection of selection
     * @private
     */
    var _calculateSelectionProducts = (products, selectionRule, raceResult)=>
    {
        var selection = {};
        selection = products.filter(function (product) {
            return selectionRule(product, raceResult);
        });
        logger.info("_calculateSelectionProducts selected" + JSON.stringify(selection));
        return selection;
    }

    return {
        calculateDividends: calculateDividends
    }

}


module.exports = dividendCalculatorService;