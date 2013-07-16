package cherepovskiy.todolist.model.service;

import cherepovskiy.todolist.model.UserAuthorities;
import cherepovskiy.todolist.model.dto.User;
import cherepovskiy.todolist.model.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {
    @PersistenceContext
    private EntityManager em;

    public User createUser(String login, String password,UserAuthorities authorities){
        UserEntity userEntity = new UserEntity(login, password, authorities);
        em.persist(userEntity);
        return new User(userEntity);
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

    public List<String> findAllUserLogin(){
        Query query = em.createNamedQuery("findUserLogins");
        List<UserEntity> listUserEntity = query.getResultList();
        List<String> listUserLogins = new ArrayList<String>();
        for(UserEntity userEntity : listUserEntity){
            listUserLogins.add(userEntity.getLogin());
        }
        return listUserLogins;
    }
}
