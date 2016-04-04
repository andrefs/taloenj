'use strict';
var im = require('imagemagick');
var imgConf = require('./config').image;
var logger = require('./logger');


exports.convert = function(src, dst, params, callback){
    var args = [src];
    return dims(src, function(err, imgDims){
        if(err){
            logger.error('Could not get convert image for '+src+':', err);
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

function dims(src, handler){
    return im.identify(['-format', '%wx%h', src], function(err, output){
        if(err){
            logger.error('Could not get image dimensions for '+src+':', err);
            return handler(err);
        }
        output.match(/\s*(\d+)\s*x\s*(\d+)/);
        var dims = [RegExp.$1, RegExp.$2];
        logger.info('Dimensions for image '+src+' are: ['+dims[0]+','+dims[1]+']');
        return handler(null, {w:+dims[0], h:+dims[1]});
    });
}
