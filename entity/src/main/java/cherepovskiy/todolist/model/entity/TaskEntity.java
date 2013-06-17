package cherepovskiy.todolist.model.entity;

import javax.persistence.*;
import java.util.Date;
@NamedQueries({
        @NamedQuery(
                name = "getTasksByAuthor",
                query = "SELECT s FROM TaskEntity s WHERE s.author = :user"
        ),
        @NamedQuery(
                name = "getTasksByAssignee",
                query = "SELECT s FROM TaskEntity s WHERE s.assignee = :user"
        ),
        @NamedQuery(
                name = "getTaskById",
                query = "SELECT s FROM TaskEntity s WHERE s.id = :id"
        )
})
@Entity
public class TaskEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;
    @Temporal(value=TemporalType.DATE)
    private Date date;
    @Enumerated(EnumType.STRING)
    private TaskState state;

    @ManyToOne
    private UserEntity author;
    @ManyToOne
    private UserEntity assignee;
    public TaskEntity() {
    }

    public TaskEntity(String contentTask, Date date, TaskState state, UserEntity author, UserEntity assignee) {
        this.author = author;
        this.content = contentTask;
        this.date = date;
        this.state = state;
        this.assignee = assignee;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public void setAuthor(UserEntity author) {
        this.author = author;
    }
    public UserEntity getAssignee() {
        return assignee;
    }

    public void setAssignee(UserEntity assignee) {
        this.assignee = assignee;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String contentTask) {
        this.content = contentTask;
    }

    public TaskState getState() {
        return state;
    }

    public void setState(TaskState state) {
        this.state = state;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date dateOfCreationTask) {
        this.date = dateOfCreationTask;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer taskId) {
        this.id = taskId;
    }
}
