package cherepovskiy.todolist.model.service;

import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.entity.UserEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/testApplicationContext.xml")
@Transactional
public class TestUser {
    @Autowired
    private UserService userService;

    @Test
    public void testSavedUserHasId() {
        User user = userService.createUser("stark@gmail.com","ice");
        assertNotNull("Problem with creating userEntity", user.getId());
    }

    @Test
    public void testFindUserByLogin() {
        String login = "stark@gmail.com";
        User user = userService.createUser(login,"ice");
        assertEquals("Problem with finding userEntity", user.getId(), userService.findUserByLogin(login).getId());
        assertEquals("Problem with finding userEntity", user.getLogin(), userService.findUserByLogin(login).getLogin());
    }


}

