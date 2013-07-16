package cherepovskiy.todolist.model.dto;

import cherepovskiy.todolist.model.UserAuthorities;
import cherepovskiy.todolist.model.entity.UserEntity;

import java.io.Serializable;

public class User {
    private Long id;

    private String login;

    private String password;

    private UserAuthorities authorities;

    public User(){}

    public User(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.login = userEntity.getLogin();
        this.password = userEntity.getPassword();
        this.authorities = userEntity.getAuthorities();
    }

    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public UserAuthorities getAuthorities() {
        return authorities;
    }

    public String getPassword() {
        return password;
    }
}
