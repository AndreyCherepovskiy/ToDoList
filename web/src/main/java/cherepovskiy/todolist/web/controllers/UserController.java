package cherepovskiy.todolist.web.controllers;

import cherepovskiy.todolist.model.UserAuthorities;
import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Persistence;
import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public User createUser(@RequestBody User user){
       if(userService.findUserByLogin(user.getLogin()) != null){
           return user;
       }
       return userService.createUser(user.getLogin(),user.getPassword(), user.getAuthorities());
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<String> getListUserLogins(){
        return userService.findAllUserLogin();
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET)
    @ResponseBody
    public User getCurrentUser(Principal principal){
        return userService.findUserByLogin(principal.getName());
    }
}
