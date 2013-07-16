package cherepovskiy.todolist.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/todolist")
public class ToDoListPageController {
    @RequestMapping(method = RequestMethod.GET)
    public String redirectToHomePage(){
        return "index";
    }

}
