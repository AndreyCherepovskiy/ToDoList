$(document).ready(function () {
    $('#content_2').hide();

    showMessageOrLists();

    $('#taskInput').bind('input', function () {
        if (isEmpty(this.value) === true) {
            $('#buttonAdd').attr("disabled", "disabled");
        }
        else {
            $('#buttonAdd').removeAttr("disabled");
        }
    });


    availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC",
        "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran",
        "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP",
        "Python", "Ruby", "Scala", "Scheme"];

    $(".assigneeInput").autocomplete({
        source: availableTags
    });


    $("#buttonAdd").click(function () {
        var contentTask = $('#taskInput');
        var assignee = $('#divCreateTask').find(".assigneeInput");
        var task = new Task(contentTask.val(), assignee.val());
        if (task.assignee != currentUser) {
            listNotExecutedTaskByAssignee.addTask(task);
            showListsHideMessage("#content_2");
            addRow(task, $("#content_2").find(".ListNotExecutedTasks"));
        } else {
            listNotExecutedTaskByAuthor.addTask(task);
            showListsHideMessage("#content_1");
            addRow(task, $("#content_1").find(".ListNotExecutedTasks"));
        }
        this.disabled = 1;
        contentTask.val('');
        assignee.val('');
    });

    $('#tab_1').click(function () {
        $('#tab_1').attr({class: "active"});
        $('#tab_2').attr({class: ""});
        $('#content_1').show();
        $('#content_2').hide();
    });

    $('#tab_2').click(function () {
        $('#tab_2').attr({class: "active"});
        $('#tab_1').attr({class: ""});
        $('#content_1').hide();
        $('#content_2').show();
    });
});

showMessageOrLists = function () {
    if (listExecutedTaskByAssignee.isEmpty() === true &&
        listNotExecutedTaskByAssignee.isEmpty() === true) {
        hideListsShowMessage('#content_2');
    } else {
        showListsHideMessage('#content_2');
    }
    if (listExecutedTaskByAuthor.isEmpty() === true &&
        listNotExecutedTaskByAuthor.isEmpty() === true) {
        hideListsShowMessage('#content_1');
    } else {
        showListsHideMessage('#content_1');
    }
}

hideListsShowMessage = function (content) {
    $(content).find(".message").show();
    $(content).find(".ListNotExecutedTasks").hide();
    $(content).find(".ListExecutedTasks").hide();
};

showListsHideMessage = function (content) {
    $(content).find(".message").hide();
    $(content).find(".ListNotExecutedTasks").show();
    $(content).find(".ListExecutedTasks").show();
};

addRow = function (task, list) {
    if (task.state == "active") {
        var firstRow = $(list).find('div:first');
        if (firstRow.get(0) == undefined) {
            $(list).append($("#templateRow").html());
        } else {
            $(firstRow).before($("#templateRow").html());
        }

        var row = $(list).find('div:first');
    } else {
        var firstRow = $(list).find('div:first');
        if (firstRow.get(0) == undefined) {
            $(list).append($("#templateRow").html());
        } else {
            $(firstRow).before($("#templateRow").html());
        }
        var row = $(list).find('div:last');
    }
    $(row).find(".assigneeInput").autocomplete({
        source: availableTags
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

addEventShowDivButton = function (row) {
    $(row).mouseover(function () {
        if ($(row).find(".fieldTask").css("display") !== "none" &&
            $(row).find(".assigneeInput").css("display") == "none") {
            $(this).find(".divButton").show();
        }
    });
};

addEventHideDivButton = function (row) {
    $(row).mouseout(function () {
        if ($(row).find(".fieldTask").css("display") !== "none") {
            $(this).find(".divButton").hide();
        }
    });
};

addEventEdit = function (row, task) {
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
        ;
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
        ;
    });
};

addEventDelete = function (row, task) {
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

addEventToDo = function (row, task) {
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
};