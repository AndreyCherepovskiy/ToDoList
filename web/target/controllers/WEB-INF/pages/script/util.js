function isEmpty(string) {
    var result = true;
    for (var i = 0; i < string.length; i++) {
        if (string[i] !== " " && string[i] !== "\n") {
            result = false;
            break;
        }
    }
    return result;
}

function getCurrentData() {
    d.toJSON()
    var d = new Date();
    var month = addZero(d.getMonth() + 1);
    var hours = addZero(d.getHours());
    var minutes = addZero(d.getMinutes());
    var day = addZero(d.getDate());
    return day + '.' + month + '.' + d.getFullYear() + " " + hours + ':' + minutes;
};
addZero = function (arg) {
    if (arg < 10) {
        arg = "0" + arg;
    }
    return arg;
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function validationAssigneeLogin(assigneeLogin, listUsersLogin) {
    for (var i = 0; i < listUsersLogin.length; i++) {
       if(assigneeLogin == listUsersLogin[i]){
           return true;
       }
    }
    return false;
}