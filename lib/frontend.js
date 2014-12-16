var spritz = require('./spritz');


exports.actions = [
    ['/', function(req,res){ return spritz.render(req,res,'test',{body:'cpa'}) }]
];
