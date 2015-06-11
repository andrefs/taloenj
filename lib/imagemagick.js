var im = require('imagemagick');

exports.convert = function(src, dst, params, callback){
    var args = [src];
    params.forEach(function(p){ args.push(p); });
    args.push(dst);

    return im.convert(args, callback);
}
