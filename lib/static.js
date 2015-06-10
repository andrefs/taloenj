var spritz = require('./spritz');

exports.actions = [
    [/^\/assets\/css\//, css],
    [/^\/assets\/js\//, js],
];

function css(req, res){
    var file = 'public'+req.url;
    return spritz.staticfile(req, res, file, 200, {'content-type': 'text/css'});
}

function js(req, res){
    var file = 'public'+req.url;
    return spritz.staticfile(req, res, file, 200, {'content-type': 'application/javascript'});
}


function staticFile(req,res, file, contentType){
    spritz.staticfile(req, res, file, 200, {'content-type': contentType});
}
