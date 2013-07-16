$(document).ready(function () {
    $("#buttonGoToSignIn").hide();
    $("#divSignUp").hide();
    $(".errorMessage").hide();
    $(".successMessage").hide();
    if (getUrlVars()["error"] == "true") {
        $("#errorSingIn").show();
    }

    var ajaxAPI = new AjaxAPI();


    $("#buttonGoToSignIn, #divSignUp,#buttonGoToSignUp,#divSignIn").on("changeMapping", function () {
        $(this).toggle();
    });

    $("button").click(function () {
        $(".errorMessage").hide();
        $(".successMessage").hide();
    })

    $("#buttonGoToSignUp").click(function () {
        $("#buttonGoToSignIn, #divSignUp,#buttonGoToSignUp,#divSignIn").trigger("changeMapping");
    });

    $("#buttonGoToSignIn").click(function () {
        $("#buttonGoToSignIn, #divSignUp,#buttonGoToSignUp,#divSignIn").trigger("changeMapping");
    });


    $("#buttonSignUp").click(function () {
        var user = new User($('#createLogin').val(), $('#createPassword').val(), "ROLE_USER")
        if (user.password == $('#confirmPassword').val()) {
            ajaxAPI.createUser(user, function (data) {
                if (data.id != null) {
                    $("#buttonGoToSignIn, #divSignUp,#buttonGoToSignUp,#divSignIn").trigger("changeMapping");
                    $("#inputLogin").val(data.login);
                    $("#inputPassword").val(data.password);
                    $("#createPassword, #confirmPassword, #createLogin").val("");
                    $("#successRegistration").show();
                } else {
                    $("#errorLogin").show();
                }
            })
        } else {
            $("#errorPassword").show();
        }
    });
});

