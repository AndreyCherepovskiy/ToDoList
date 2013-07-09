package cherepovskiy.todolist.model.service;

import cherepovskiy.todolist.model.dto.Task;
import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.entity.TaskEntity;
import cherepovskiy.todolist.model.entity.TaskState;
import cherepovskiy.todolist.model.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class TaskService {
    @PersistenceContext
    private EntityManager em;

    public Task createTask(String contentTask, Date date, TaskState state, User author, User assignee){
        UserEntity authorEntity = getUserEntity(author);
        UserEntity assigneeEntity = getUserEntity(assignee);
        TaskEntity taskEntity = new TaskEntity(contentTask,date,state, authorEntity, assigneeEntity);
        em.persist(taskEntity);
        Task task = new Task(taskEntity);
        return task;
    }


    public List<Task> findTaskByAuthor(User author){
        Query query = em.createNamedQuery("getTasksByAuthor");
        UserEntity authorEntity = getUserEntity(author);
        query.setParameter("user", authorEntity);
        return createListOfTask(query.getResultList());
    }

    public List<Task> findTaskByAssignee(User assignee){
        Query query = em.createNamedQuery("getTasksByAssignee");
        UserEntity assigneeEntity = getUserEntity(assignee);
        query.setParameter("user", assigneeEntity);
        return createListOfTask(query.getResultList());
    }

    public void removeTask(Task task){
        em.remove(getTaskEntity(task));
    }

    public void updateTask(Task task){
        TaskEntity taskEntity = getTaskEntity(task);
        taskEntity.setAssignee(getUserEntity(task.getAssignee()));
        taskEntity.setAuthor(getUserEntity(task.getAuthor()));
        taskEntity.setContent(task.getContent());
        taskEntity.setDate(task.getDate());
        taskEntity.setState(task.getState());
    }

    private List<Task> createListOfTask(List<TaskEntity> listOfTaskEntity){
        List<Task> listOfTask = new ArrayList<Task>();
        for(TaskEntity taskEntity : listOfTaskEntity){
            listOfTask.add(new Task(taskEntity));
        }
        return listOfTask;
    }
    private TaskEntity getTaskEntity(Task task){
        Query query = em.createNamedQuery("getTaskById");
        query.setParameter("id", task.getId());
        return  (TaskEntity)query.getSingleResult();
    }

    private UserEntity getUserEntity(User user){
        Query query = em.createNamedQuery("findUserById");
        query.setParameter("id", user.getId());
        return  (UserEntity)query.getSingleResult();
    }



}
