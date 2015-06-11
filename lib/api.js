'use strict';
var formidable = require('formidable');
var async      = require('fastsync');
var paths      = require('./config').paths;
var actions    = [];
var convert    = require('./imagemagick').convert;
var printer    = require('./printer').printer;
var fs         = require('fs.extra');
var spritz     = require('./spritz');

exports.actions = [
    [/\/api\/print\/?/, {method: 'POST'}, print]
];

function print(req, res){
    var file = req.POSTfiles['img-upload'];
    var opts = req.POSTargs['opts'] || {};
    var z1   = +req.POSTargs['z1'];
    var z2   = +req.POSTargs['z2'];
    var imParams = [
        '-level'     , (z1*100)+'%,'+(z2*100)+'%',
        '-colorspace', 'gray',
        '-resize'    , '384x384\>'
    ];

    var timestamp = new Date().getTime();
    var tmpPath      = file.path;
    var originalPath = paths.originals+'/original_'+timestamp;
    var finalPath    = paths.finals+'/final_'+timestamp+'.png';

    async.series([
        // Move file to originals folder
        function(next){
            fs.move(tmpPath, originalPath, next);
        },
        // Convert and keep result in finals folder
        function(next){
            console.log('convert', originalPath, finalPath, imParams);
            convert(originalPath, finalPath, imParams, next);
        },
        // Print
        function(next){
            console.log(arguments);
            console.log('printer', finalPath, opts);
            printer.print(finalPath, opts, next);
        }
    ],  function(err){
            if(err){
                var result = {
                    ok: false,
                    errorInfo: {},
                    errorMsg: err.toString(),
                    startedAt  : timestamp,
                    finishedAt : new Date().getTime()
                };
                return spritz.json(req,res,result, 500);
            }

            var result = {
                ok         : true,
                startedAt  : timestamp,
                finishedAt : new Date().getTime()
            };
            return spritz.json(req,res,result);
        }
    );
}

