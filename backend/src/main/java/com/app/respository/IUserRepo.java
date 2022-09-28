package com.app.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.User;

@Repository
public interface IUserRepo extends JpaRepository<User, Integer> {

	boolean existsByEmail(String email);

	User findByEmailAndPassword(String email, String password);
	
	@Modifying
	@Query("update User u set u.password = ?2 where u.email = ?1")
	int updatePasswordByEmail(String email, String password);

	Optional<User> findByEmail(String email);

}
