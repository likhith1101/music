package com.music.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.music.app.entity.User;

 
public interface UserRepository extends JpaRepository< User, Long> {

	Useronal<User> findByName(String name);

	boolean existsByName(String name);
	
}
