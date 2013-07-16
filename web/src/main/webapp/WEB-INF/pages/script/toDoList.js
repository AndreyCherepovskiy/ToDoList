$(document).ready(function () {
    mapping = new Mapping();
    dataModel = new DataModel();
    ajaxAPI = new AjaxAPI();
    ajaxAPI.getCurrentUser(function (data) {
        $("body").trigger("receivedCurrentUser");
        dataModel.currentUser = new User(data.login, data.password, data.authorities, data.id);
    });

    $("body").on("receivedCurrentUser", function () {
        ajaxAPI.getListUsersLogin(function (data) {
            dataModel.listUsersLogin = data;
            mapping.autocomplete(".assigneeInput");
            $("body").trigger("receivedListUsersLogin")
        })
    });

    $("body").on("receivedListUsersLogin", function () {
        ajaxAPI.getListTasksByAssignee(function (data) {
            data = sortByTime(data);
            for (var i = 0; i < data.length; i++){
                dataModel.listTask.addTask(data[i]);
                mapping.addRow(data[i]);
            }
        })
        ajaxAPI.getListTasksByAuthor(function (data) {
            data = sortByTime(data);
            for (var i = 0; i < data.length; i++){
                dataModel.listTask.addTask(data[i]);
                mapping.addRow(data[i]);
            }
        })
    });

    $("#buttonAdd").click(function () {
        addTask();
    });
    $("#taskInput").keypress(function (e) {
        if (e.which == 13) {
            addTask();
        }
    });

});

addTask = function () {
    var contentTask = $('#taskInput');
    var assignee = $('#divCreateTask').find(".assigneeInput");
    if (assignee.val() == "") {
        assignee.val(dataModel.currentUser.login);
    }
    if (validationLoginOfAssignee(assignee.val(), dataModel.listUsersLogin)) {
        var task = new Task(contentTask.val(), new User(dataModel.currentUser.login),new User(assignee.val()) , new Date(), "ACTIVE");
        ajaxAPI.createTask(task, function (task) {
            dataModel.listTask.addTask(task);
            mapping.addRow(task);
        })

        $("#buttonAdd").attr("disabled", "disabled");
        contentTask.val('');
        assignee.val('');
    } else {
        alert("User with the login " + assignee.val() + " to exist. Enter another of assignee.");
    }
}


