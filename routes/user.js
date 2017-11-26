var UserModel = require('../models/users');
// mongoose.connect('mongodb://localhost/tekpub_test');  
// describe("users", function(){  
//   var currentuser = null;  

//   beforeEach(function(done){    
//     //add some test data    
//     user.register("test@test.com", "password", "password", function(doc){      
//       currentuser = doc;      
//       done();    
//     });  
//   });  

//   afterEach(function(done){    
//     user.model.remove({}, function() {      
//       done();    
//     });  
//   });

//   it("registers a new user", function(done){    
//     user.register("test2@test.com", "password", "password", function(doc){      
//       doc.email.should.equal("test2@test.com");      
//       doc.crypted_password.should.not.equal("password");      
//       done();    
//     }, function(message){      
//       message.should.equal(null);      
//       done();    
//     }); 
//   }); 

//   it("retrieves by email", function(done){    
//     user.findByEmail(currentuser.email, function(doc){      
//       doc.email.should.equal("test@test.com");       
//       done();    
//     });  
//   });  

//   it("retrieves by token", function(done){    
//     user.findByToken(currentuser.auth_token, function(doc){      
//       doc.email.should.equal("test@test.com");      
//       done();    
//     });  
//   });  

//   it("authenticates and returns user with valid login", function(done){    
//     user.authenticate(currentuser.email, "password", function(user){      
//       user.email.should.equal("test@test.com");      
//       done();    
//     }, function(){      
//       throw("oops");      
//       done();    
//     });  
//   });  

//   it("authenticates and returns fail with invalid login", function(done){    
//     user.authenticate(currentuser.email, "liar", function(user){      
//       throw("This shouldn't happen");    
//     }, function(){      
//       done();    
//     });  
//   });
// });

exports.init = function(app) {
    app.put("/users/:firstname/:lastname/:username/:status", addUser)

    app.get("/users/:firstname/:lastname", getUser);

    app.post("/users/:firstname/:lastname/:username/:status", updateUser);

    app.delete("/users/:firstname/:lastname", deleteUser);

  // app.get("/", index);
}

var addUser = function(request, response){
    const firstname = request.params.firstname;
    const lastname = request.params.lastname;
    const username = request.params.username;
    const status = request.params.status;
    var instance = new UserModel();
    instance.username = username;
    instance.name.first = firstname;
    instance.name.last = lastname;
    instance.status = status;
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


