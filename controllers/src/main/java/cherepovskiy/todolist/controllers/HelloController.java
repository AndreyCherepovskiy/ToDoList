package cherepovskiy.todolist.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/users")
public class HelloController {

    //Welcome-page redirect
    @RequestMapping(method = RequestMethod.GET)
    public String redirectToHomePage(){
        return "index";
    }
}
