package cherepovskiy.todolist.model.service;


import cherepovskiy.todolist.model.dto.Task;
import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.entity.TaskEntity;
import cherepovskiy.todolist.model.entity.TaskState;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/testApplicationContext.xml")
@Transactional
public class TestTask {
    @Autowired
    private UserService userService;
    @Autowired
    private TaskService taskService;

    @Test
    public void testSavedTask() {
        User user = userService.createUser("stark@gmail.com", "ice");
        Task task = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user, user);
        assertNotNull("Problem with creating taskEntity", task.getId());
    }

    @Test
    public void testFindTaskByAuthor() {
        User user1 = userService.createUser("stark@gmail.com", "ice");
        User user2 = userService.createUser("lanister@gmail.com", "demon");
        Task task1 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user1, user1);
        Task task2 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user1, user2);
        Task task3 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user2, user2);
        List<Task> listTask = taskService.findTaskByAuthor(user1);
        assertNotNull("Problem with finding taskEntity by author", listTask);
        for (Task task : listTask) {
            assertEquals("Problem with finding taskEntity by author", user1.getId(), task.getAuthor().getId());
        }
    }

    @Test
    public void testFindTaskByAssignee() {
        User user1 = userService.createUser("stark@gmail.com", "ice");
        User user2 = userService.createUser("lanister@gmail.com", "demon");
        Task task1 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user1, user1);
        Task task2 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user1, user2);
        Task task3 = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user2, user2);
        List<Task> listTask = taskService.findTaskByAssignee(user2);
        assertNotNull("Problem with finding taskEntity by responsible", listTask);
        for (Task task : listTask) {
            assertEquals("Problem with finding taskEntity by responsible", user2.getId(), task.getAssignee().getId());
        }
    }

    @Test
    public void testRemoveTask() {
        User user = userService.createUser("stark@gmail.com", "ice");
        Task task = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user, user);
        taskService.removeTask(task);
        List<Task> listOfTask = taskService.findTaskByAuthor(user);
        assertEquals("Problem with remove task.", 0, listOfTask.size());
    }

    @Test
    public void testUpdateTask() {
        User user = userService.createUser("stark@gmail.com", "ice");
        Task task = taskService.createTask("Read book.", new Date(), TaskState.COMPLETED, user, user);
        String newContent = "Sleep.";
        Date newDate = new Date();
        TaskState newState = TaskState.ACTIVE;
        task.setState(newState);
        task.setContent(newContent);
        task.setDate(newDate);
        taskService.updateTask(task);
        Task newTask = taskService.findTaskByAuthor(user).get(0);
        assertEquals("Problem with update task", newTask.getContent(), newContent);
        assertEquals("Problem with update task", newTask.getDate(), newDate);
        assertEquals("Problem with update task", newTask.getState(), newState);
    }
}
