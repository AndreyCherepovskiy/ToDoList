Mapping = function () {
    $('#contentTasksByAssignee').hide();

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

    this.hideListsShowMessage = function (content) {
        $(content).find(".message").show();
        $(content).find(".ListNotExecutedTasks").hide();
        $(content).find(".ListExecutedTasks").hide();
    };

    this.showListsHideMessage = function (content) {
        $(content).find(".message").hide();
        $(content).find(".ListNotExecutedTasks").show();
        $(content).find(".ListExecutedTasks").show();
    };

    this.addRow = function (task) {
        var list;
        if (task.assignee.login != dataModel.currentUser.login) {
            list = $("#contentTasksByAssignee").find(".ListNotExecutedTasks");
        } else {
            list = $("#contentTasksByAuthor").find(".ListNotExecutedTasks");
        }
        this.showListsHideMessage(list.parent());

        if (task.state != "active") {
            var firstRow = $(list).find('div:first');
            if (firstRow.get(0) == undefined) {
                $(list).append($("#templateRow").html());
            } else {
                $(firstRow).before($("#templateRow").html());
            }
            var row = $(list).find('div:last');
        } else {
            var firstRow = $(list).find('div:first');
            if (undefined != firstRow.get(0)) {
                $(firstRow).before($("#templateRow").html());
            } else {
                $(list).append($("#templateRow").html());
            }

            var row = $(list).find('div:first');
        }
        $(row).find(".assigneeInput").autocomplete({
            source: dataModel.listUsersLogin
        });
        $(row).find('.fieldTask').text(task.content);
        $(row).find('.authorField').text(task.author);
        $(row).find('.assigneeField').text(task.assignee);
        $(row).find('.dateField').text(task.date);
        $(row).find(".divButtonEdit").hide();
        $(row).find(".divButton").hide();
        $(row).find(".textAreaEdit").hide();
        $(row).find(".assigneeInput").hide();
        $(row).attr({id: task.id});


        addEventHideDivButton(row);
        addEventShowDivButton(row);
        addEventDelete(row, task);
        addEventToDo(row, task);
        addEventEdit(row, task);
    };

    this.addEventShowDivButton = function (row) {
        $(row).mouseover(function () {
            if ($(row).find(".fieldTask").css("display") !== "none" &&
                $(row).find(".assigneeInput").css("display") == "none") {
                $(this).find(".divButton").show();
            }
        });
    };

    this.addEventHideDivButton = function (row) {
        $(row).mouseout(function () {
            if ($(row).find(".fieldTask").css("display") !== "none") {
                $(this).find(".divButton").hide();
            }
        });
    };

    this.addEventEdit = function (row, task) {
        $(row).find(".fieldTask").dblclick(function () {
            $(row).find(".fieldTask").hide();
            $(row).find(".divButton").hide();
            $(row).find(".divButtonEdit").show();
            $(row).find(".textAreaEdit").show();
            $(row).find(".textAreaEdit").val(task.content);
        });

        $(row).find(".assigneeField").dblclick(function () {
            $(row).find(".assigneeField").hide();
            $(row).find(".divButtonEdit").show();
            $(row).find(".assigneeInput").show();
            $(row).find(".assigneeInput").val(task.assignee);
        });

        $(row).find(".textAreaEdit").bind('input', function () {
            if (isEmpty(this.value) === true) {
                $(row).find(".buttonSave").attr("disabled", "disabled");
            }
            else {
                $(row).find(".buttonSave").removeAttr("disabled");
            }
        });

        $(row).find(".assigneeInput").bind('input', function () {
            if (isEmpty(this.value) === true) {
                $(row).find(".buttonSave").attr("disabled", "disabled");
            }
            else {
                $(row).find(".buttonSave").removeAttr("disabled");
            }
        });

        $(row).find(".buttonSave").click(function () {
            $(row).find(".assigneeField").show();
            $(row).find(".assigneeInput").hide();
            $(row).find(".fieldTask").show();
            $(row).find(".divButton").show();
            $(row).find(".divButtonEdit").hide();
            $(row).find(".textAreaEdit").hide();

            task.content = $(row).find(".textAreaEdit").val();
            task.assignee = $(row).find(".assigneeInput").val();
            $(row).find(".fieldTask").text(task.content);
            $(row).find(".assigneeField").text(task.assignee);
        });

        $(row).find(".buttonCancel").click(function () {
            $(row).find(".fieldTask").show();
            $(row).find(".divButton").show();
            $(row).find(".divButtonEdit").hide();
            $(row).find(".textAreaEdit").hide();

        });
    };

    this.addEventDelete = function (row, task) {
        $(row).find('.buttonDelete').click(function () {
            if (task.author === currentUser) {
                if (confirm("Are you sure?")) {
                    if (task.assignee !== currentUser) {
                        if (task.state == "completed") {
                            listExecutedTaskByAssignee.removeTask(task.id);
                        } else {
                            listNotExecutedTaskByAssignee.removeTask(task.id);
                        }
                    } else {
                        if (task.state == "completed") {
                            listExecutedTaskByAuthor.removeTask(task.id);
                        } else {
                            listNotExecutedTaskByAuthor.removeTask(task.id);
                        }
                    }
                    $(row).remove();
                    showMessageOrLists();
                }
            } else {
                alert("You do not have permission to delete tasks if you are not the author.");
            }

        });
    };

    this.addEventToDo = function (row, task) {
        $(row).find(".buttonToDo").click(function () {
            if (task.state === "active") {
                task.state = "complited";
                row.find($(".fieldTask")).css({'textDecoration': "line-through"});
                var list = $(row).parent().parent().find('.ListExecutedTasks');
                row.detach();
                row.appendTo(list);
            } else {
                task.state = "active";
                row.find($(".fieldTask")).css({'textDecoration': "none"});
                var list = $(row).parent().parent().find('.ListNotExecutedTasks');
                row.detach();
                var firstRow = $(list).find('div:first');
                if (firstRow.get(0) == undefined) {
                    row.appendTo(list);
                } else {
                    $(firstRow).before(row);
                }
            }


        });
    }
};

