'use strict';
var log = require('../log').log('print');
var moment = require('moment');


function print(paths, opts, callback){
    var SerialPort = require('serialport').SerialPort,
        serialPort = new SerialPort('/dev/ttyUSB0', {
            baudrate: 19200
        }),
        Printer = require('thermalprinter');

    serialPort.on('open',function() {
        log.info('Serial port /dev/ttyUSB0 opened');
	    var prtOpts = {
            // these params seem to work fine for a 2.1+1.0 source
            // powering the printer + a model B RasPi
	    	maxPrintingDots :   5,
	    	heatingTime     : 250,
	    	heatingInterval : 100,
	    	commandDelay    : 500
	    };
        var date = new Date();
        var today = date.toISOString().substr(0,10);
        var hour  = date.toISOString().substr(11,4);
        var printer = new Printer(serialPort, prtOpts);
        printer.on('ready', function() {
            log.info('Printer ready');
		    var p = printer
			    .lineFeed(1)
                .printLine( moment().format('YYYY.MM.DD HH:mm'))
                .lineFeed(1);
            paths.forEach(function(img){
                log.info('Printing '+img);
                p = p.printImage(img)
                //.lineFeed(1)
                ;

            });
			p = p.lineFeed(4)
		    	.print(function() {
                    log.info('Finished printing '+paths.join(', '));
		    		return callback();
		    	});
            });
    });
}

exports.printer = {
    print: print
};
