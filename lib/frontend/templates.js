var hbs     = require('handlebars');
var fs      = require('fs');
var appRoot = require('app-root-path').toString();
var path    = require('path');

var templates = {};

function load(){
    // Load partials
    //_loadPartials();

    // // Register helpers
    //_registerPartials();

    // Compile views
    var viewsDir = appRoot+'/views';
    var dirs = fs.readdirSync(viewsDir).filter(function(file) {
        return file !== 'partials' && fs.statSync(path.join(viewsDir, file)).isDirectory();
    });
    dirs.forEach(function(dir){
        _loadDir(dir,templates);
    });

    return templates;
};

function _loadDir(dirname, templates){
    // Compile views
    var viewsDir = appRoot+'/views/'+dirname;
    filenames = fs.readdirSync(viewsDir);
    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if(!matches){ return; }
        var name = matches[1];
        var template = fs.readFileSync(viewsDir + '/' + filename, 'utf8');
        templates[dirname] = templates[dirname] || {};
        templates[dirname][name] = hbs.compile(template);
    });
}

function _loadPartials(){
    // Load partials
    var partialsDir = appRoot+'/views/partials/';
    var filenames = fs.readdirSync(partialsDir);
    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if(!matches){ return; }
        var name = matches[1];
        var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        hbs.registerPartial(name, template);
    });
}

function _registerPartials(){
    // hbs.registerHelper('buttonImg', function(){
    //     var color =
    //         this.length < 1 ? 'blue' :
    //         this.length < 2 ? 'green' :
    //         this.length < 3 ? 'yellow' :
    //         'red';
    //         return color+'.png';
    // });
}

exports.load = load;

