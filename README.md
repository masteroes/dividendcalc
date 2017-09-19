# Dividend calculator for Tote Betting
Dividendcalc is a dividend calculator service for tote betting. Currently it has implemented only command line usage , but can be easily integrated with other rest API, or front-end  apps too. It has implemeted test cases, linting and logging. It uses Gulp build tool. 

[dividendCalculatorService](https://github.com/masteroes/dividendcalc/blob/master/app/services/dividendCalculatorService.js) uses product object, winning selection rule functions  and result object for calculation.

All rule functions are defined in rules folder. These functions takes product and results and return a boolean value based on winning logic for respective product.

[betFormatter](https://github.com/masteroes/dividendcalc/blob/master/app/util/betFormatter.js) is a utility used to create Bets and Result objects. It parses and splits input strings bases on delimiters.

[inputValidator](https://github.com/masteroes/dividendcalc/blob/master/app/util/validaton.js) is to validated input strings(currently not implemented).

[index.js](https://github.com/masteroes/dividendcalc/blob/master/index.js) is the implementation of the dividend calculator service. It uses ['readline'](https://nodejs.org/api/readline.html) module of Node.js. on entering a string in bet format the 'line' event triggers capturing of data in to input array. The line containg results closes the input stream.

On 'close' event we format the inputData array create an initializes dividendCalculatorService with product , rule and result. Passing bets array will result in dividend float value upto 2 decimal places. 

The Output is formatted as per problem requirements.

# Usage
Clone the project in a folder
```sh
$ git clone https://github.com/masteroes/dividendcalc.git
$ cd dividendcalc
$ npm install
$ npm start
```

# Input data
The command prompt will prompt for data with usage message like 
command prompt
```sh
Usage Bet:<W/P/E>:<selection[,selection]>:<stake>
Usage Result:<first>:<second>:<third>
>
```
Type data or copy paste from  [InputDataForTerminal](https://raw.githubusercontent.com/masteroes/dividendcalc/master/InputDataForTerminal) file
Result line will be the last input line 

# Output

The output will be flashed on Terminal in  <product>:<winning selection>:<dividend> format.

# Run test cases and Reports
```sh
$ install gulp globally using
$ npm install -g gulp
$ gulp
```
* this will create reports folder in root director of project
* Will run elint tool and will prompt on screen for errors
* will create report in reports folder
* will run all test cases and show coverage report

# Reports
Open in browser ./reports/lint-results.html

# Logs
[Bunyan](https://www.npmjs.com/package/bunyan) is used for logs. It can be traced in infoLevel.log file in root folder.

# Configuration
* Products and commission configuration can be set in config.js
* Syntax quality can be configured from .eslintrc.js
* Logger settings can be configured in defaultLogger.js
    
# Todos
Further enhancements can be done by implementing validations, error handlings, more test cases, even implementing databases and usage as  rest API .

License
----

MIT
