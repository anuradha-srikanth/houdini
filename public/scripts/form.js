const url = "users";

$(function(){
    $('#addUser').submit(function(event){
        let firstname = $("#addUser #fname").val();
        let lastname = $("#addUser #lname").val();
        let username = $("#addUser #username").val();
        let status = $("#addUser #status").val();
        let password = $("#addUser #password").val();
        let pwd_conf = $("#addUser #pwd_conf").val();
        $.ajax({
            url: url+ `/${firstname}/${lastname}/${username}/${status}/${password}/${pwd_conf}`,
            type: 'PUT',
            success: function(result) {
              // Do something with the result
              // $("#sol").html(JSON.stringify(result));
              $("#sol").html(result);
              console.log(result);
            }
        });
        event.preventDefault();
    });

    $('#delUser').submit(function(event){
        let firstname = $("#delUser #fname").val();
        let lastname = $("#delUser #lname").val();
        console.log(name);
        $.ajax({
            url: url+`/${firstname}/${lastname}`,
            type: 'DELETE',
            success: function(result) {
              // Do something with the result
              $("#sol").html(result);
              // $("#sol").html(JSON.stringify(result));
              console.log(result);
            }
        });

        event.preventDefault();
    });


    $('#editUser').submit(function(event){
        let firstname = $("#editUser #fname").val();
        let lastname = $("#editUser #lname").val();
        let username = $("#editUser #username").val();
        let status = $("#editUser #status").val();
        $.ajax({
            url: url+ `/${firstname}/${lastname}/${username}/${status}`,
            type: 'POST',
            success: function(result) {
              $("#sol").html(result);
              // Do something with the result
              // $("#sol").html(JSON.stringify(result));
              console.log(result);
            } 
        });
        event.preventDefault();
    });


    $('#viewUser').submit(function(event){
        let firstname = $("#viewUser #fname").val();
        let lastname = $("#viewUser #lname").val();

        $.ajax({
            url: url+ `/${firstname}/${lastname}`,
            type: 'GET',
            success: function(result) {
              // Do something with the result
              $("#sol").html(result);
              // $("#sol").html(JSON.stringify(result));
              console.log(result);
            }
        });
        event.preventDefault();

    });


});