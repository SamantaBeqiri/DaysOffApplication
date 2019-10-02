package com.application.BE.dto;


import com.application.BE.entities.Application;
import com.application.BE.entities.Role;

import java.util.List;

public class UserDTO {

    private long id;
    private String name;
    private String surname;
    private String username;
    private Role role;
    private Long daysNo;
    private List<Application> applications;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getDaysNo() {
        return daysNo;
    }

    public void setDaysNo(Long daysNo) {
        this.daysNo = daysNo;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }
}