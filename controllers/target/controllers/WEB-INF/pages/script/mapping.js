Mapping = function () {
    $('#contentTasksByAuthor').hide();

    $('#taskInput').bind('input', function () {
        if (isEmpty(this.value) === true) {
            $('#buttonAdd').attr("disabled", "disabled");
        } else {
            $('#buttonAdd').removeAttr("disabled");
        }
    });

    $('#tabTasksByAssignee').click(function () {
        $('#tabTasksByAssignee').attr({class: "active"});
        $('#tabTasksByAuthor').removeAttr("class");
        $('#contentTasksByAuthor').hide();
        $('#contentTasksByAssignee').show();
    });

    $('#tabTasksByAuthor').click(function () {
        $('#tabTasksByAuthor').attr({class: "active"});
        $('#tabTasksByAssignee').removeAttr("class");
        $('#contentTasksByAuthor').show();
        $('#contentTasksByAssignee').hide();
    });

    this.autocomplete = function (argument) {
        $(argument).autocomplete({
            source: dataModel.listUsersLogin
        });
    }

    this.showMessageOrLists = function () {
        if (dataModel.listTask.isEmptyListTaskByAssignee()) {
            this.hideListsShowMessage('#contentTasksByAssignee');
        }
        if (dataModel.listTask.isEmptyListTaskByAuthor()) {
            this.hideListsShowMessage('#contentTasksByAuthor');
        }
    }

    this.hideListsShowMessage = function (content) {
        $(content).find(".message").show();
        $(content).find(".ListNotExecutedTasks, .ListExecutedTasks").hide();
    };

    this.showListsHideMessage = function (content) {
        $(content).find(".message").hide();
        $(content).find(".ListNotExecutedTasks, .ListExecutedTasks").show();
    };
    this.addEventToVisibleDivButton= function(row){
        $(row).mouseover(function () {
            $(this).find(".divButton").show();
        });

        $(row).mouseout(function () {
            $(this).find(".divButton").hide();
        });
    }

    this.addEventToVisibleDivButtonEdit = function(row){
        $(row).mouseover(function () {
            $(this).find(".divButtonEdit").show();
        });

        $(row).mouseout(function () {
            $(this).find(".divButtonEdit").hide();
        });
    }

    this.removeEventToVisibleDivsButton = function(row){
        $(row).unbind('mouseover');
        $(row).unbind('mouseover');
    }


    this.hideEditFields = function (row) {
        $(row).find(".fieldTask, .divButton, .assigneeField").show();
        $(row).find(".divButtonEdit, .assigneeInput, .textAreaEdit").hide();
    };

    this.addRow = function (task) {
        var list;
        if (task.assignee.login == dataModel.currentUser.login) {
            if (task.state == "ACTIVE") {
                list = $("#contentTasksByAssignee").find(".ListNotExecutedTasks");
            } else {
                list = $("#contentTasksByAssignee").find(".ListExecutedTasks");
            }
        } else {
            if (task.state == "ACTIVE") {
                list = $("#contentTasksByAuthor").find(".ListNotExecutedTasks");
            } else {
                list = $("#contentTasksByAuthor").find(".ListExecutedTasks");
            }
        }
        this.showListsHideMessage(list.parent());

        var classRow;
        var firstRow = $(list).children('div:first');
        if (undefined != firstRow.get(0)) {
            $(firstRow).before($("#templateRow").html());
        } else {
            $(list).append($("#templateRow").html());
        }
        var row = $(list).children('div:first');
        if (task.state == "ACTIVE") {
            classRow = "lineNotExecutedTask";
        } else {
            classRow = "lineExecutedTask";
        }
        $(row).find(".assigneeInput").autocomplete({
            source: dataModel.listUsersLogin
        });

        $(row).find('.fieldTask').text(task.content);
        $(row).find('.authorField').text(task.author.login);
        $(row).find('.assigneeField').text(task.assignee.login);
        $(row).find('.dateField').text(getCurrentData(new Date(task.date)));
        $(row).find(".divButtonEdit, .divButton, .textAreaEdit, .assigneeInput").hide();
        $(row).attr({id: task.id, class: classRow});

        this.addEventToVisibleDivButton(row);

        $(row).find(".fieldTask, .assigneeField").dblclick(function () {
            if (dataModel.listTask.getTask($(row).attr("id")).author.login == dataModel.currentUser.login) {
                $(row).find(".fieldTask, .divButton, .assigneeField").hide();
                $(row).find(".divButtonEdit, .assigneeInput, .textAreaEdit").show();
                $(row).find(".textAreaEdit").val(task.content);
                $(row).find(".assigneeInput").val(task.assignee.login);
                mapping.removeEventToVisibleDivsButton(row);
                mapping.addEventToVisibleDivButtonEdit(row);
            } else {
                alert("You do not have permission to change tasks, if you are not the author.");
            }
        });

        $(row).find(".buttonCancel").click(function () {
            mapping.hideEditFields(row);
        });

        $(row).find(".textAreaEdit").bind('input', function () {
            if (isEmpty(this.value) === true) {
                $(row).find(".buttonSave").attr("disabled", "disabled");
            }
            else {
                $(row).find(".buttonSave").removeAttr("disabled");
            }
        });

        $(row).find(".buttonSave").click(function () {
            var id = $(row).attr("id");
            var content = $(row).find(".textAreaEdit").val();
            var loginOfAssignee = $(row).find(".assigneeInput").val();
            var task = dataModel.listTask.getTask(id);
            if (validationLoginOfAssignee(loginOfAssignee, dataModel.listUsersLogin)) {
                var task = dataModel.listTask.getTask(id);
                task.assignee.login = loginOfAssignee;
                task.content = content;
                task.date = new Date();
                ajaxAPI.updateTask(task);
                $(row).remove();
                mapping.addRow(task);
                mapping.showMessageOrLists();
                mapping.removeEventToVisibleDivsButton(row);
                mapping.addEventToVisibleDivButton(row);
            } else {
                alert("User with the login " + task.assignee.login + " to exist. Enter another of assignee.")
            }

        });

        $(row).find('.buttonDelete').click(function () {
            var task = dataModel.listTask.getTask($(row).attr("id"));
            if (task.author.login == dataModel.currentUser.login) {
                if (confirm("Are you sure?")) {
                    ajaxAPI.removeTask(task);
                    dataModel.listTask.removeTask(task.id);
                    $(row).remove();
                    mapping.showMessageOrLists();
                }
            } else {
                alert("You do not have permission to delete tasks, if you are not the author.");
            }

        });

        $(row).find(".buttonToDo").click(function () {
            var task = dataModel.listTask.getTask($(row).attr("id"));
            if (task.assignee.login == dataModel.currentUser.login) {
                if (task.state === "ACTIVE") {
                    task.state = "COMPLETED";
                } else {
                    task.state = "ACTIVE";
                }
                ajaxAPI.updateTask(task);
                $(row).remove();
                mapping.addRow(task);
            } else {
                alert("You do not have permission to execute tasks, if you are not the assignee.");
            }
        });
    };

};

