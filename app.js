var spritz = require('./lib/spritz'),
    routes = require('./lib/routes');

function start(opts){
    // Start (with so many processes as CPU cores)
    spritz.start({
        port: 8090,
        processes: require('os').cpus().length
    });

    routes.inject(spritz);
}

exports.app = {
    start: start
};
