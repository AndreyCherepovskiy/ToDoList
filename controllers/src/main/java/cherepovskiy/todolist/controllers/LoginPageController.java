package cherepovskiy.todolist.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/login")
public class LoginPageController {
    @RequestMapping(method = RequestMethod.GET)
    public String redirectToLoginPage(){
        return "login";
    }
}