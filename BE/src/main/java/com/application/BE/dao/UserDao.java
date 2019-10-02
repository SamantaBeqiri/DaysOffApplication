package com.application.BE.dao;

import com.application.BE.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(long id);
   // List Us
}