package cherepovskiy.todolist.model.dto;

import cherepovskiy.todolist.model.entity.TaskEntity;
import cherepovskiy.todolist.model.entity.TaskState;

import java.util.Date;

public class Task {

    private Integer id;

    private Date date;
    private TaskState state;
    private String content;

    private User author;

    private User assignee;

    public Task(TaskEntity taskEntity) {
        this.assignee = new User(taskEntity.getAssignee());
        this.author = new User(taskEntity.getAuthor());
        this.date = taskEntity.getDate();
        this.id = taskEntity.getId();
        this.state = taskEntity.getState();
        this.content = taskEntity.getContent();
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }
}
