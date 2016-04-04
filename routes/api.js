'use strict';
var express = require('express');
var router  = express.Router();
var async   = require('fastsync');
var paths   = require('../lib/config').paths;
var convert = require('../lib/imagemagick').convert;
var printer = require('../lib/printer').printer;
var fs      = require('fs.extra');
var glob    = require('glob');

router.post('/print/', print);

function print(req, res){
    var file =  req.body['img-upload'];
    var opts =  req.body['opts'] || {};
    var z1   = +req.body['z1'];
    var z2   = +req.body['z2'];
    var imParams = [
        '-resize'    , '384x2000',
        '-level'     , (z1*100)+'%,'+(z2*100)+'%',
        '-colorspace', 'gray'
    ];

    var timestamp = new Date().getTime();
    var tmpPath      = file.path;
    var originalPath = paths.originals+'/original_'+timestamp;
    var finalPaths   = paths.finals+'/final_'+timestamp;

    async.series([
        // Move file to originals folder
        function(next){
            fs.move(tmpPath, originalPath, next);
        },
        // Convert and keep result in finals folder
        function(next){
            convert(originalPath, finalPaths+'-%d.png', imParams, next);
        },
        // Print
        function(next){
            glob(finalPaths+'*', {}, function(err, files){
                if(err){ return next(err); }
                printer.print(files, opts, next);
            });
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
                return res.send(result);
            }

            var result = {
                ok         : true,
                startedAt  : timestamp,
                finishedAt : new Date().getTime()
            };
            return res.send(result);
        }
    );
}

module.exports = router;
