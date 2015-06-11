var spritz = require('./lib/spritz'),
    routes = require('./lib/routes'),
    mkdirp = require('mkdirp'),
    paths  = require('./lib/config').paths;

function start(opts){
    initFunctions();

    // Start (with so many processes as CPU cores)
    spritz.start({
        port: 8090,
        //processes: require('os').cpus().length,
        processes:1
    });

    routes.inject(spritz);
}

function initFunctions(){
    mkdirp.sync(paths.tmp);
    mkdirp.sync(paths.originals);
    mkdirp.sync(paths.finals);
}

exports.app = {
    start: start
};
