package cherepovskiy.todolist.model.dto;

import cherepovskiy.todolist.model.entity.UserEntity;

public class User {
    private Long id;

    private String login;


    public User(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.login = userEntity.getLogin();
    }

    public Long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }
}
