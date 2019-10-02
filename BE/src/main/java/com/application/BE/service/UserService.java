package com.application.BE.service;

import com.application.BE.dao.UserDao;
import com.application.BE.dto.ApplicationDTO;
import com.application.BE.dto.UserDTO;
import com.application.BE.entities.Role;
import com.application.BE.entities.User;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

//import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder bcryptEncoder;
    @Autowired
    private UserDao userDao;

    private static final Logger logger = LogManager.getLogger(UserService.class);


    public UserDTO add(User user) {
        logger.debug("adding user {}",user);
        return Optional.of(user)
                .map(e -> this.setPassword(e.getPassword(), e))
                .map(this::save)
                .map(this::fromUserToDto).orElseThrow(RuntimeException::new);

    }

    public void updateDaysLeft(ApplicationDTO applicationDto) {
        User user = userDao.findById(applicationDto.getRequestedBy().getId());
        long days = user.getDaysNo() - calculateDiffStartEnd(applicationDto.getStartDate(), applicationDto.getEndDate());
        user.setDaysNo(days);
        userDao.save(user);
    }


    public User save(User user) {
        user.setRole(Role.ROLE_USER);
        long nr = 30;
        user.setDaysNo(nr);
        return userDao.save(user);
    }

    public List<UserDTO> getAllUsers() {
        logger.info("getting all users");
        return userDao.findAll().stream()
                .map(this::fromUserToDto)
                .collect(Collectors.toList());
    }

    public UserDTO update(UserDTO userDto) {
        return Optional.of(userDto).map(this::fromDtoToUser)
                .map(this::save)
                .map(this::fromUserToDto).orElseThrow(RuntimeException::new);

    }

    public UserDTO getById(Long id) {
        return userDao.findById(id).map(this::fromUserToDto).orElse(null);
    }

    public UserDTO loadUser(String username) throws UsernameNotFoundException {
        logger.info("loading user");
        User user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User  found with username: " + username);
        }
        return fromUserToDto(user);
    }

    public void delete(Long id) {
        this.userDao.deleteById(id);
    }


    public UserDTO fromUserToDto(User user) {
        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setDaysNo(user.getDaysNo());
        userDto.setSurname(user.getSurname());
        userDto.setApplications(user.getApplications());
        userDto.setRole(user.getRole());
        return userDto;


    }

    public User fromDtoToUser(UserDTO userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setRole(userDto.getRole());
        user.setDaysNo(userDto.getDaysNo());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setUsername(userDto.getUsername());
        return user;
    }


    public String generatePassword(String password) {
        return bcryptEncoder.encode(password);

    }

    public User setPassword(String password, User user) {
        user.setPassword(this.generatePassword(password));
        return user;

    }

    public long calculateDiffStartEnd(Date start, Date end) {
        return (long) Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24.0));
    }

}
