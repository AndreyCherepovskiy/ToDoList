package cherepovskiy.todolist.model.service;

import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.entity.UserEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Service
public class UserService {
    @PersistenceContext
    private EntityManager em;

    public User createUser(String login, String password){
        UserEntity userEntity = new UserEntity(login, password);
        em.persist(userEntity);
        User user = new User(userEntity);
        return user;
    }

    public User findUserByLogin(String login){
        Query query = em.createNamedQuery("findUserByLogin");
        query.setParameter("login", login);
        try{
            UserEntity userEntity = (UserEntity)query.getSingleResult();
            return  new User(userEntity);
        }catch (NoResultException exception){
            return null;
        }
    }

    public boolean checkUserWithLoginPassword(String login, String password){
        Query query = em.createNamedQuery("findUserByLogin");
        query.setParameter("login", login);
        try{
            UserEntity userEntity = (UserEntity)query.getSingleResult();
            if(userEntity.getPassword() != password){
                return false;
            }
            return  true;
        }catch (NoResultException exception){
            return false;
        }
    }
}
