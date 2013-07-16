<html>
<head>
    <title>To Do List</title>
    <script type="text/javascript" src="pages\script\jquery-1.9.1.js"></script>
    <script type="text/javascript" src="pages\script\util.js"></script>
    <script type="text/javascript" src="pages\script\ajaxAPI.js"></script>
    <script type="text/javascript" src="pages\script\dataModel.js"></script>
    <script type="text/javascript" src="pages\script\login.js"></script>
    <link href="pages/style/style.css" rel="stylesheet">

</head>
<body>
<div id="Login">
    <div id="headline">
        <h1> To do list</h1>

        <div id="divButtonGo">
            <button id="buttonGoToSignIn">Sign in</button>
            <button id="buttonGoToSignUp">Sign up</button>
        </div>
    </div>
    <div id="divLogin">
        <div id="divSignIn">
            <form action="/j_spring_security_check" method='POST'>
                <h2>Sign in</h2>
                <input type='text' name='j_username' id="inputLogin" placeholder="Login"/>
                <input type='password' name='j_password' id="inputPassword" placeholder="Password"/>

                <p id="errorSingIn" class="errorMessage">The username or password you have entered is incorrect.</p>

                <p id="successRegistration" class="successMessage">Registration was successful.</p>
                <input name="submit" id="buttonSignIn" type="submit" value="Sign in"/>
            </form>
        </div>
        <div id="divSignUp">
            <h2>Registration</h2>
            <textarea id="createLogin" placeholder="Type your e-mail"></textarea>
            <input type='password' id="createPassword" placeholder="Create a password"/>
            <input type='password' id="confirmPassword" placeholder="Confirm your password"/>

            <p id="errorPassword" class="errorMessage">These passwords don't match. Try again?</p>

            <p id="errorLogin" class="errorMessage">Someone already has this login. Try another login?</p>

            <button id="buttonSignUp">Sign up</button>
        </div>
    </div>
</div>

</body>
</html>