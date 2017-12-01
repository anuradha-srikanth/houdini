var UserModel = require('../models/users');

exports.init = function(app) {
    app.put("/users/:firstname/:lastname/:username/:status/:password/:password_confirmation", addUser)

    app.get("/users/:firstname/:lastname", getUser);

    app.post("/users/:firstname/:lastname/:username/:status", updateUser);

    app.delete("/users/:firstname/:lastname", deleteUser);

  // app.get("/", index);
}

var addUser = function(request, response){
    // console.log(response)
    const firstname = request.params.firstname;
    const lastname = request.params.lastname;
    const username = request.params.username;
    const password = request.params.password;
    const pwd_conf = request.params.password_confirmation;
    const status = request.params.status;
    var instance = new UserModel();
    instance.username = username;
    instance.name.first = firstname;
    instance.name.last = lastname;
    instance.status = status;
    instance.password = password;
    instance.password_confirmation = pwd_conf;
    instance.save(function (err) {
      if(err) return handleError(err);
      response.render('addUser',{
        'fname'     :instance.name.first,
        'lname'     :instance.name.last,
        'username'  :instance.username,
        'status'    :instance.status
    });
  });
}

var getUser = function(request, response){
    const firstname = request.query.firstname;
    const lastname = request.query.lastname;

    UserModel.findOne({
        'name.first' : firstname,
        'name.last'  : lastname

    }, function (err, user) {
        if(err){
            console.log("ERROR");
            return handleError(err);
        }
        console.log(user.name.first);
         // docs.forEach
         response.render('viewUser',{
            'fname'     :user.name.first,
            'lname'     :user.name.last,
            'username'  :user.username,
            'status'    :user.status
        });
     });
}


var deleteUser = function(request, response){
    const firstname = request.params.firstname;
    const lastname = request.params.lastname;
    UserModel.remove({ 
        'name.first' : firstname,
        'name.last'  : lastname 
    }, 
    function (err) {
        if (err) return handleError(err);
      // removed!
            // response.send("Deleted User");
            response.render('deleteUser',{
                'fname'     :firstname,
                'lname'     :lastname,
            // 'username'  :user.username,
            // 'status'    :user.status
        });
        });
}

var updateUser = function(request, response){
    const firstname = request.params.firstname;
    const lastname = request.params.lastname;
    const username = request.params.username;
    const status = request.params.status;
    UserModel.findOneAndUpdate({
        'name.first' : firstname,
        'name.last'  : lastname

    },
    {
        'username' : username,
        'status'   : status
    }, function (err, user) {
        if(err) return handleError(err);
         // docs.forEach
         // response.send(user)
         response.render('updateUser',{
            'fname'     :user.name.first,
            'lname'     :user.name.last,
            'oldusername'  :user.username,
            'oldstatus'    :user.status,
            'newusername'  :username,
            'newstatus'    :status
        });
     });
}

var handleError = function(error){
    console.log(error + "was found in your query")
}


