package cherepovskiy.todolist.controllers;

import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createUser(@RequestParam("login") String login, @RequestParam("password") String password){
        User user = userService.createUser(login, password);
        //return userService.createUser(user.getLogin(), user.get, user.getAuthority());
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<String> getListUserLogins(){
        return userService.findAllUserLogin();
    }
}
