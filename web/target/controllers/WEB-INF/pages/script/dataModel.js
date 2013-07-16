function Task(content, author, assignee, date, state, id) {
    this.content = content;
    this.date = date;
    this.author = author;
    this.assignee = assignee;
    this.state = state;
    this.id = id;
}

function User(login, password, authorities, id) {
    this.login = login;
    this.password = password;
    this.id = id;
    this.authorities = authorities;
}

function ListTask() {
    this.collection = [];
    this.addTask = function (argument) {
        this.collection[this.collection.length] = argument;
    };

    this.getTask = function (id) {
        for (var i = 0; i < this.collection.length; i++) {
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
    this.isEmptyListTaskByAssignee = function () {
        for(var i = 0; i < this.collection.length; i++){
            if(this.collection[i].assignee === dataModel.currentUser.login){
                return false;
            }
        }
        return true;
    };
    this.isEmptyListTaskByAuthor = function () {
        for(var i = 0; i < this.collection.length; i++){
            if(this.collection[i].author === dataModel.currentUser.login &&
                this.collection[i].assignee != dataModel.currentUser.login){
                return false;
            }
        }
        return true;
    };
};

dataModel = {
    currentUser : [],
    listUsersLogin : [],
    listTask : new ListTask()
}
