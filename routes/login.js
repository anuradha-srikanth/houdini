var UserModel = require('../models/users');

exports.init = function(app) {

    app.post("/login", authenticate);


}


var authenticate = function(request, response){
    console.log('hello')
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login', 
        failureFlash: "Invalid username or password" ,
        successFlash: "Welcome!"});
    // res.redirect('/users/' + req.user.username);
}