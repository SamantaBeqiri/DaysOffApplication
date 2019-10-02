package com.application.BE.dao;

import com.application.BE.dto.ApplicationDTO;
import com.application.BE.entities.Application;
import com.application.BE.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationDao extends JpaRepository<Application, Long> {
   // Application findById(Long id);

    @Query(value = "SELECT * from application where requested_by= ?1", nativeQuery = true)
    List<Application> findAllByRequestedById(Long id);

}
