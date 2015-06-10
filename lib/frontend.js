var spritz = require('./spritz');

exports.actions = [
    ['/', home]
];

function home(req, res){
    return spritz.render(req,res,'frontend/home',{
        body:'test'
    });
}
