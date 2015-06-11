'use strict';

function print(path, opts, callback){
    var SerialPort = require('serialport').SerialPort,
        serialPort = new SerialPort('/dev/ttyUSB0', {
            baudrate: 19200
        }),
        Printer = require('thermalprinter');

    serialPort.on('open',function() {
	    var prtOpts = {
	    	maxPrintingDots: 7,
	    	heatingTime: 250,
	    	heatingInterval: 100,
	    	commandDelay: 5
	    };
        var printer = new Printer(serialPort, prtOpts);
        printer.on('ready', function() {
		    printer
			    .lineFeed(3)
		    	.printImage(path)
			    .lineFeed(3)
		    	.print(function() {
		    		console.log('done');
		    		return callback();
		    	});
            });
    });
}

exports.printer = {
    print: print
};
