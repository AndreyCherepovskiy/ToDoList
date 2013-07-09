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

getCurrentDate = function () {
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