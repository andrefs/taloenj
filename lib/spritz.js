var async      = require('async');
var spritz     = require('spritz');
var handlebars = require('handlebars');
var fs         = require('fs');
var views      = require('./frontend/templates').load();

var _template = function(req, res, view, args, status, headers){
    var view     = view.split(/\//);
    var template = views[view[0]][view[1]];
    var output   = template(args);

    // If empty output
    if (output === null){
        res.writeHead(500,{'content-type':'text/html; charset=utf-8'});
        return res.end("Error: "+JSON.stringify(err));
    }

    var length = Buffer.byteLength(output,'utf8');
    // Send the output
    res.statusCode = status || 200;
    res.writeHead(res.statusCode,_merge({
        'content-type'   : 'text/html; charset=utf-8',
        'content-length' : length
    },headers));
    res.end(output);
};

spritz.render = function(req,res, view, args){
    return _template(req, res, view, args, 200, {});
};

// Merge 2 objects
var _merge = function(a,b){
    var o = {};
    if ( a != null ) {
        for ( var p in a )
            o[p.toLowerCase()] = a[p];
    }
    if ( b != null ) {
        for ( var p in b )
            o[p.toLowerCase()] = b[p];
    }
    return o;
};


module.exports = spritz;
