'use strict';
var formidable = require('formidable');
var async      = require('async');
var paths      = require('./config').paths;
var actions    = [];
var convert    = require('./api/imagemagick').convert;
var printer    = require('./api/printer').printer;
var fs         = require('fs.extra');
var spritz     = require('./spritz');
var glob       = require('glob');
var log        = require('./log').log('api');
var moment     = require('moment');

exports.actions = [
    [/\/api\/print\/?/, {method: 'POST'}, print]
];

function print(req, res){
    var file = req.POSTfiles['img-upload'];
    var opts = req.POSTargs['opts'] || {};
    var z1   = +req.POSTargs['z1'];
    var z2   = +req.POSTargs['z2'];
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
      // print pixels camp logo
      function(next){
        printer.printImages([paths.system+'/pixels.png'], opts, next);
      },
      // print image
      function(next){
        glob(finalPaths+'*', {}, function(err, files){
          if(err){ return next(err); }
          printer.printImages(files, opts, next);
        });
      },
      // print date
      function(next){
        var date = new Date();
        var today = date.toISOString().substr(0,10);
        var hour  = date.toISOString().substr(11,4);

        printer.printLines([
          '',
          '   Printed on '+moment().format('YYYY.MM.DD HH:mm'),
          //'',
        ], opts, next);
      },
      // print footer
      function(next){
        printer.printImages([paths.system+'/footer.png'], opts, next);
      },
      // print url
      function(next){
        printer.printLines([
          '',
          '     pixels.camp/projects/16',
          '',
          '',
          '',
          ''
        ], opts, next);
      },
    ], function(err){
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
    });
}

