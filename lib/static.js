'use strict';

var spritz = require('./spritz');

exports.actions = [
    [/^\/assets\/css\//   , css]  ,
    [/^\/assets\/js\//    , js]   ,
    [/^\/assets\/fonts\// , font] ,
];

function css(req, res){
    var file = 'public'+req.url;
    return spritz.staticfile(req, res, file, 200, {'content-type': 'text/css'});
}

function js(req, res){
    var file = 'public'+req.url;
    return spritz.staticfile(req, res, file, 200, {'content-type': 'application/javascript'});
}

function font(req, res){
    var file = 'public'+req.url.replace(/\?.*$/,'');
    var contentType = 'font/opentype';

    if(file.match(/\.woff$/)) { contentType = 'application/font-woff'; }
    if(file.match(/\.eot$/))  { contentType = 'application/vnd.ms-fontobject'; }
    if(file.match(/\.svg$/))  { contentType = 'image/svg+xml'; }
    if(file.match(/\.ttf$/))  { contentType = 'application/font-sfnt'; }
    if(file.match(/\.woff2$/)){ contentType = 'application/font-woff2'; }

    return spritz.staticfile(req, res, file, 200, {'content-type': contentType});
}


function staticFile(req,res, file, contentType){
    spritz.staticfile(req, res, file, 200, {'content-type': contentType});
}
