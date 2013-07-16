package cherepovskiy.todolist.model.entity;

import cherepovskiy.todolist.model.TaskState;
import cherepovskiy.todolist.model.UserAuthorities;

import javax.persistence.*;
@NamedQueries({
    @NamedQuery(
        name="findUserByLogin",
        query = "SELECT s FROM UserEntity s WHERE s.login = :login"
    ),
    @NamedQuery(
        name="findUserById",
        query = "SELECT s FROM UserEntity s WHERE s.id = :id"
    ),
    @NamedQuery(
        name="findUserLogins",
        query = "SELECT s FROM UserEntity s"
    )
})
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserAuthorities authorities;

    public UserEntity() {
    }

    public UserEntity(String login, String password, UserAuthorities authorities) {
        this.login = login;
        this.password = password;
        this.authorities = authorities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserAuthorities getAuthorities() {
        return authorities;
    }

    public void setAuthorities(UserAuthorities authorities) {
        this.authorities = authorities;
    }
}
