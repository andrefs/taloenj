var spritz = require('../spritz');

var controllers = {};

controllers.index = function(req,res){
    spritz.json(req,res,{ok:1});
};

exports.actions = [
    ['/api/', controllers.index]
];
