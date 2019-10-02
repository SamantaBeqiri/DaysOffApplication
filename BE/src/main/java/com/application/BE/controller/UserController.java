package com.application.BE.controller;


import com.application.BE.dto.UserDTO;
import com.application.BE.entities.User;
import com.application.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping()
    public  ResponseEntity<UserDTO>addUser(@RequestBody User user){
        return ResponseEntity.ok(userService.add(user));
    }


    @GetMapping()
    public ResponseEntity<UserDTO> loadUser(@RequestParam String username) {
        return ResponseEntity.ok(userService.loadUser(username));

    }

    @GetMapping("/get")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());

    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id){
        userService.delete(id);
        return ResponseEntity.ok().build();

    }
    @PutMapping
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDto) {

        return ResponseEntity.ok(userService.update(userDto));
    }

}
