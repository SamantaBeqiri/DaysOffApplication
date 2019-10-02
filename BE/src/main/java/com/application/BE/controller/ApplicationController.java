package com.application.BE.controller;

import com.application.BE.dto.ApplicationDTO;
import com.application.BE.dto.UserPrincipal;
import com.application.BE.service.ApplicationService;
import com.application.BE.service.LogedUser;
import com.application.BE.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


/**
 * @GetMapping("") -->TE GJITHE APLIKIMET APO VETEM APLIKIMET E USERIT TE LOGUAR ?
 * @GetMapping("/{id}")
 * @PostMapping("")
 * @PutMapping("/{id}")
 * @DeleteMapping("/{id}")
 */
@CrossOrigin()
@RestController()
@RequestMapping("/api/application")
public class ApplicationController {


    @Autowired
    ApplicationService applicationService;

    @Autowired
    UserService userService;

    @PostMapping()
    public ResponseEntity <ApplicationDTO> create(@Valid @RequestBody ApplicationDTO application, @LogedUser UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.save(application, principal));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDTO> getApplicationById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }


    @GetMapping()
    public ResponseEntity<List<ApplicationDTO>> getAll(@LogedUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok(applicationService.getAll(userPrincipal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id) {
        applicationService.delete(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDTO> update(@RequestBody ApplicationDTO applicationDto, @PathVariable("id") long id,@LogedUser UserPrincipal principal) {
        return ResponseEntity.ok(applicationService.update(applicationDto));
    }

    //@PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/reject/{id}")
    public ResponseEntity<ApplicationDTO> reject(@PathVariable("id") Long id, @LogedUser  UserPrincipal userPrincipal) {
        return ResponseEntity.ok(applicationService.reject(id, userPrincipal));
    }

   // @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/approve/{id}")
    public ResponseEntity<ApplicationDTO> approve(@PathVariable("id") Long id, @LogedUser  UserPrincipal userPrincipal,@RequestBody ApplicationDTO applicationDto) {
            userService.updateDaysLeft(applicationDto);
       // System.out.println((applicationDto.getEndDate().getTime()-applicationDto.getStartDate().getTime())/(1000 * 3600 * 24));
        //System.out.println(applicationDto.getRequestedBy().getId());
        // userService.(applicationDto)
        return ResponseEntity.ok(applicationService.approve(id, userPrincipal));
    }
}











