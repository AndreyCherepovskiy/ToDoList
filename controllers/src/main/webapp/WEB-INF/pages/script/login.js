$(document).ready(function () {
    $("#buttonGoToSignIn").hide();
    $("#divSignUp").hide();
    $("#errorPassword").hide();
    $("#errorLogin").hide();

    $("#buttonGoToSignUp").click(function () {
        $("#buttonGoToSignIn").show();
        $("#divSignUp").show();
        $("#buttonGoToSignUp").hide();
        $("#divSignIn").hide();
    });

    $("#buttonGoToSignIn").click(function () {
        $("#buttonGoToSignIn").hide();
        $("#divSignUp").hide();
        $("#buttonGoToSignUp").show();
        $("#divSignIn").show();
    });
    if(getUrlVars()["error"] != "true"){
        $("#divSignIn").find("p").hide();
    }

    $("#buttonSignUp").click(function(){
        var user = new User($('#createLogin').val(),$('#createPassword').val())
        if(user.password == $('#confirmPassword').val()){
            var isLoginUnique = true;
            for(i=0; i< listUsersLogin.length;i++){
                if(listUsersLogin[i] == user.login){
                    isLoginUnique == false;
                }
            }
            if(isLoginUnique == false){
                $("#errorLogin").show();
                return;
            }
            $.ajax({
                url: "/user/create",
                method: "POST",
                data: "login="+user.login+"&password=" + user.password
            });
        }else{
            $("#errorPassword").show();
        }
    });
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}