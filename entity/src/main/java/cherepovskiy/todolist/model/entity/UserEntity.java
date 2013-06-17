package cherepovskiy.todolist.model.entity;

import javax.persistence.*;
@NamedQueries({
    @NamedQuery(
        name="findUserByLogin",
        query = "SELECT s FROM UserEntity s WHERE s.login = :login"
    ),
    @NamedQuery(
        name="findUserById",
        query = "SELECT s FROM UserEntity s WHERE s.id = :id"
    )
})
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String password;

    public UserEntity() {
    }

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
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
}