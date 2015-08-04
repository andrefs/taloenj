'use strict';
var im = require('imagemagick');
var imgConf = require('../config').image;
var log = require('../log').log('imagemagick');


exports.convert = function(src, dst, params, callback){
    var args = [src];
    return dims(src, function(err, imgDims){
        if(err){
            log.error('Could not get convert image for '+src+':', err);
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
        log.info('Converting image '+src+' to '+dst+':');
        log.info('    convert '+args.join(' '));
        return im.convert(args, callback);
    });
}

function dims(src, handler){
    return im.identify(['-format', '%wx%h', src], function(err, output){
        if(err){
            log.error('Could not get image dimensions for '+src+':', err);
            return handler(err);
        }
        output.match(/\s*(\d+)\s*x\s*(\d+)/);
        var dims = [RegExp.$1, RegExp.$2];
        log.info('Dimensions for image '+src+' are: ['+dims[0]+','+dims[1]+']');
        return handler(null, {w:+dims[0], h:+dims[1]});
    });
}
