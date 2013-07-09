<html>
<head>
    <title>To Do List</title>
    <script type="text/javascript" src="pages\script\jquery-1.9.1.js"></script>
    <script type="text/javascript" src="pages\script\dataModel.js"></script>
    <script type="text/javascript" src="pages\script\login.js"></script>
    <link href="WEB-INF/pages/style/style.css" rel="stylesheet">

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
        <form name='f' action="<c:url value='j_spring_security_check' />" method='POST'>
            <input type='text' name='j_username' id="inputLogin" placeholder="Login"/>
            <input type='password' name='j_password' id="inputPassword" placeholder="Password"/>
            <input name="submit" id="buttonSignIn" type="submit" value="Sign in"/>
        </form>
    </div>
    <div id="divSignUp">
        <textarea id="createLogin" placeholder="Type your e-mail"></textarea>
        <textarea id="createPassword" placeholder="Create a password"></textarea>
        <textarea id="confirmPassword" placeholder="Confirm your password"></textarea>
        <button id="buttonSignUp">Sign up</button>
    </div>
</div>

</body>
</html>