'use strict';

var bunyan = require('bunyan');
var defaultLogger;
defaultLogger = bunyan.createLogger(
    {
        name: 'LOGS',
        stream: process.stdout,
        level: 'info'
    }
);
module.exports = defaultLogger;