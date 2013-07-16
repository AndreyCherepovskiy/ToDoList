package cherepovskiy.todolist.web.controllers;

import cherepovskiy.todolist.model.TaskState;
import cherepovskiy.todolist.model.UserAuthorities;
import cherepovskiy.todolist.model.dto.Task;
import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.service.TaskService;
import cherepovskiy.todolist.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    UserService userService;

    @Autowired
    TaskService taskService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public Task createTask(@RequestBody Task task){
        User author = userService.findUserByLogin(task.getAuthor().getLogin());
        User assignee = userService.findUserByLogin(task.getAssignee().getLogin());
        return taskService.createTask(task.getContent(), task.getDate(), task.getState(), author, assignee);
    }

    @RequestMapping(value = "/listByAuthor", method = RequestMethod.GET)
    @ResponseBody
    public List<Task> getListUserLoginsByAuthor(Principal principal){
        User user = userService.findUserByLogin(principal.getName());
        return  taskService.findTaskByAuthor(user);
    }

    @RequestMapping(value = "/listByAssignee", method = RequestMethod.GET)
    @ResponseBody
    public List<Task> getListUserLoginsByAssignee(Principal principal){
        User user = userService.findUserByLogin(principal.getName());
        return  taskService.findTaskByAssignee(user);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public void updateTask(@RequestBody Task task){
        task.setAuthor(userService.findUserByLogin(task.getAuthor().getLogin()));
        task.setAssignee(userService.findUserByLogin(task.getAssignee().getLogin()));
        taskService.updateTask(task);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    @ResponseBody
    public void removeTask(@RequestBody Task task){
        taskService.removeTask(task);
    }
}
