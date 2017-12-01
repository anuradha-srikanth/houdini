const url = "login";


$(function(){
    $('#loginForm').submit(function(event){
        let username = $("#loginForm #username").val();
        let password = $("#loginForm #password").val();

        $.ajax({
            url: url,
            type: 'POST',
            dataL {
              "username" : username,
              "password" : password
            }
            success: function(result) {
              // Do something with the result
              // $("#sol").html(JSON.stringify(result));
              // $("#sol").html(result);
              console.log(result);
            }
        });
        event.preventDefault();
    });