$(document).ready(function () {
    mapping = new Mapping();
    var ajaxAPI = new AjaxAPI();
    var viewToDoList;
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
        //viewToDoList = new ViewToDoList();
    });

    $("#buttonAdd").click(function () {
        addTask();
    });
    $("#taskInput").keypress(function(e) {
        if(e.which == 13) {
            addTask();
        }
    });

});

addTask = function(){
    var ajaxAPI = new AjaxAPI();
    var contentTask = $('#taskInput');
    var assignee = $('#divCreateTask').find(".assigneeInput");
    if(assignee.val() == ""){
        assignee.val(dataModel.currentUser.login);
    }
    if(validationAssigneeLogin(assignee.val(), dataModel.listUsersLogin)){
        var task = new Task(contentTask.val(), new User(assignee.val()), new User(dataModel.currentUser.login), new Date(), "ACTIVE");
        ajaxAPI.createTask(task, function(task){
            dataModel.listTask.addTask(task);
            mapping.addRow(task);
        })

        $("#buttonAdd").attr("disabled","disabled");
        contentTask.val('');
        assignee.val('');
    }else{
        alert("User with the login "+assignee.val() + " to exist. Enter another of assignee.")
    }
}


