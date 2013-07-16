function AjaxAPI() {
    this.createUser = function (user, callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            url: "/users/create",
            method: "POST",
            dataType: 'json',
            data: JSON.stringify(user),
            success: function (data) {
                callback(data);
            }
        })
    }

    this.getCurrentUser = function (callback) {
        $.ajax({
            url: "/users/current",
            method: "GET",
            success: function (data) {
                callback(data);
            }
        })
    }

    this.getListUsersLogin = function (callback) {
        $.ajax({
            url: "/users",
            method: "GET",
            success: function (data) {
                callback(data);
            }
        })
    }

    this.createTask = function (task, callback) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            url: "/tasks/create",
            method: "POST",
            data: JSON.stringify(task),
            success: function (data) {
                callback(data);
            }
        })
    }

    this.getListTasksByAuthor = function (callback) {
        $.ajax({
            url: "/tasks/listByAuthor",
            method: "GET",
            success: function (data) {
                callback(data);
            }
        })
    }

    this.getListTasksByAssignee = function (callback) {
        $.ajax({
            url: "/tasks/listByAssignee",
            method: "GET",
            success: function (data) {
                callback(data);
            }
        })
    }

    this.updateTask = function (task) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            url: "/tasks/update",
            method: "POST",
            data: JSON.stringify(task)
        })
    }

    this.removeTask = function (task) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            url: "/tasks/remove",
            method: "POST",
            data: JSON.stringify(task)
        })
    }
}