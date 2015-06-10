var dispatch = {
    api      : require('./api').actions,
    frontend : require('./frontend').actions,
    static   : require('./static').actions
};

exports.inject = function(spritz){
    for (var area in dispatch){
        for(var i=0; i<dispatch[area].length; i++){
            var route = dispatch[area][i][0];

            dispatch[area][i].length > 2 ?
                spritz.on(route, dispatch[area][i][1], dispatch[area][i][2]) :
                spritz.on(route, dispatch[area][i][1]);
        }
    }
}

