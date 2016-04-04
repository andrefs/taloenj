'use strict';
var im      = require('imagemagick');
var imgConf = require('./config').image;
var logger  = require('./logger');
var async   = require('async');
var fs = require('fs');

function ImageMagick(){}

ImageMagick.prototype.convert = function(src, dst, params, callback){
    var args = [src];
    return this.dims(src, function(err, imgDims){
        if(err){
            logger.error('Could not convert image '+src+':', err);
            return handler(err);
        }
        if(imgDims.w > imgDims.h){
            params.unshift('-rotate','90');
            imgDims = {
                h: imgDims.w,
                w: imgDims.h
            };
        }
        if(imgDims.h > imgConf.maxHeight){
            params.push('-crop','384x'+imgConf.splitHeight);
        }
        params.forEach(function(p){ args.push(p); });
        args.push(dst);
        logger.info('Converting image '+src+' to '+dst+':');
        logger.info('    convert '+args.join(' '));
        return im.convert(args, callback);
    });
}

ImageMagick.prototype.dims = function(src, handler){
    var self = this;

    async.waterfall([
        function(next)     {
            self._cbExists(src, next);
        },
        function(next){
            self._dims_sysCall(src, next);
        },
        function(output, next){
            self._dims_parseOutput(output, next);
        }
    ], function(err, dims){
        if(err){ return handler(err); }
        logger.info('Dimensions for image '+src+' are: ['+dims[0]+','+dims[1]+']');
        return handler(null, {w:+dims[0], h:+dims[1]});
    });
}

ImageMagick.prototype._dims_sysCall = function(src, handler){
    return im.identify(['-format', '%wx%h', src], function(err, output){
        if(err){
            logger.error('Could not get image dimensions for '+src+':', err);
            return handler(err);
        }
        return handler(null, output);
    });
}

ImageMagick.prototype._dims_parseOutput = function(output, handler){
    var regex = /\s*(\d+)\s*x\s*(\d+)/;
    if(!output.match(regex) || RegExp.$1 === '' || RegExp.$2 === ''){
        var err = "Could not parse Image Magick's system call output";
        logger.error(err);
        return handler(new Error(err));
    }
    var dims = [RegExp.$1, RegExp.$2];
    return handler(null, dims);
}

ImageMagick.prototype._cbExists = function(src, handler){
    fs.exists(src, function(exists){
        if(!exists){
            var err = "Could not find file '"+src+"'";
            logger.error(err);
            return handler(err);
        }
        return handler(null);
    });
};

module.exports = new ImageMagick();
