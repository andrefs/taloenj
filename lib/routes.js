var api      = require('./api');
var frontend = require('./frontend');

var dispatch = {
    api      : api.actions,
    frontend : frontend.actions
};

exports.inject = function(spritz){
    console.log('Injecting routes:');
    for (var area in dispatch){
        for(var i=0; i<dispatch[area].length; i++){
            console.log("\t",dispatch[area][i][0]);
            var route = dispatch[area][i][0] instanceof RegExp
                ? dispatch[area][i][0]
                : new RegExp(dispatch[area][i][0]);

            dispatch[area][i].length > 2 ?
                spritz.on(route, dispatch[area][i][1], dispatch[area][i][2]) :
                spritz.on(route, dispatch[area][i][1]);
        }
    }
}

