'use strict';
var log = require('./log').log('print');
var moment = require('moment');


function print(path, opts, callback){
    var SerialPort = require('serialport').SerialPort,
        serialPort = new SerialPort('/dev/ttyUSB0', {
            baudrate: 19200
        }),
        Printer = require('thermalprinter');

    serialPort.on('open',function() {
        log.info('Serial port /dev/ttyUSB0 opened');
	    var prtOpts = {
	    	maxPrintingDots: 7,
	    	heatingTime: 250,
	    	heatingInterval: 100,
	    	commandDelay: 5
	    };
        var date = new Date();
        var today = date.toISOString().substr(0,10);
        var hour  = date.toISOString().substr(11,4);
        var printer = new Printer(serialPort, prtOpts);
        printer.on('ready', function() {
            log.info('Printer ready');
		    printer
			    .lineFeed(3)
                .printLine( moment().format('YYYY.MM.DD HH:mm'))
                .lineFeed(1)
		    	.printImage(path)
			    .lineFeed(6)
		    	.print(function() {
                    log.info('Finished printing '+path);
		    		return callback();
		    	});
            });
    });
}

exports.printer = {
    print: print
};
