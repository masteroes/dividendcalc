'use strict';

var bunyan = require('bunyan');
var defaultLogger;
defaultLogger = bunyan.createLogger(
    {
        name: 'LOGS',
        level: 'info',
        streams: [{
            path: 'infoLevel.log'
        }]
    }
);
module.exports = defaultLogger;