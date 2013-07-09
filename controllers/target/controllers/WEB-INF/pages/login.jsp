<html>
<head>
    <title>To Do List</title>
    <script type="text/javascript" src="pages\script\jquery-1.9.1.js"></script>
    <script type="text/javascript" src="pages\script\dataModel.js"></script>
    <script type="text/javascript" src="pages\script\login.js"></script>
    <link href="pages/style/style.css" rel="stylesheet">

</head>
<body>
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
            <input type='text' name='j_username' id="inputLogin" placeholder="Login"/>
            <input type='password' name='j_password' id="inputPassword" placeholder="Password"/>
            <p>The username or password you have entered is incorrect.</p>
            <input name="submit" id="buttonSignIn" type="submit" value="Sign in"/>
        </form>
    </div>
    <div id="divSignUp">
        <textarea id="createLogin" placeholder="Type your e-mail"></textarea>
        <input type='password' id="createPassword" placeholder="Create a password"/>
        <input type='password' id="confirmPassword" placeholder="Confirm your password"/>
        <p id="errorPassword">These passwords don't match. Try again?</p>
        <p id="errorLogin">Someone already has that username.
            Note that we ignore full stops and capitalisation in usernames. Try another?</p>
        <button id="buttonSignUp">Sign up</button>
    </div>
</div>

</body>
</html>