var winston = require('winston');

var logger  = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level            : 'debug',
            handleExceptions : true,
            json             : false,
            colorize         : true
        })
    ],
    exitOnError: false
});

// To be used by morgan for requests logging
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;
