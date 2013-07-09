currentUser = "Author";
listUsersLogin = [];

function Task(content, assignee) {
    this.content = content;
    this.date = getCurrentDate();
    this.author = currentUser;
    this.assignee = assignee;
    this.state = "active";
    this.id = freeId.getId();
};

function User(login, password) {
    this.login = login;
    this.password = password;
};

function listTask() {
    this.collection = [];
    this.addTask = function (argument) {
        this.collection[this.collection.length] = argument;
        ;
    };
    this.getTask = function (id) {
        for (i = 0; i < this.collection.length; i++) {
            if (this.collection[i].id == id) {
                return this.collection[i];
            }
        }
    };
    this.removeTask = function (id) {
        for (i = 0; i < this.collection.length; i++) {
            if (this.collection[i].id === id) {
                this.collection.splice(i, 1);
                break;
            }
        }
    };
    this.isEmpty = function () {
        return (this.collection.length === 0);
    };
};

listExecutedTaskByAuthor = new listTask();
listNotExecutedTaskByAuthor = new listTask();
listExecutedTaskByAssignee = new listTask();
listNotExecutedTaskByAssignee = new listTask();


var freeId = {
    id: 0,
    getId: function () {
        return this.id++;
    }
};