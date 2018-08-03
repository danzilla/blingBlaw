var mongo = require("mongo");
var monk = require("monk");
var db = monk("localhost:27017/danustanBling")
app.use(function(req,res,next){
    req.db = db;
    next();
});
