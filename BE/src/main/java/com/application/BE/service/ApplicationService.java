package com.application.BE.service;

import com.application.BE.dao.ApplicationDao;
import com.application.BE.dao.UserDao;
import com.application.BE.dto.ApplicationDTO;
import com.application.BE.dto.UserPrincipal;
import com.application.BE.entities.Application;
import com.application.BE.entities.Role;
import com.application.BE.entities.Status;
import com.application.BE.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
public class ApplicationService {
    @Autowired
    UserDao userDao;

    @Autowired
    ApplicationDao applicationDao;
    @Autowired
    UserService userService;



    public ApplicationDTO save(ApplicationDTO applicationDto, @LogedUser UserPrincipal principal) {
        User user = userDao.findById(principal.getId());
       /* Application application = fromDtoToEntity(applicationDto);
        application.setRequestedBy(user);
        application.setStatus(Status.PENDING);
        applicationDao.save(application);
        return fromEntityToDto(application);*/
        return Optional.of(this.fromDtoToEntity(applicationDto))
                .map(a->{a.setRequestedBy(user); return a;})
                .map(a->{a.setStatus(Status.PENDING);return a;})
                .map(this::saveApplication)
                .map(this::fromEntityToDto).orElse(null);

    }

    public Application saveApplication(Application app){
        return applicationDao.save(app);
    }



    public ApplicationDTO getApplicationById(Long id) {
        return applicationDao.findById(id)
                .map(this::fromEntityToDto)
                .orElseThrow(RuntimeException::new);

    }


    public void delete(Long id) {
        applicationDao.deleteById(id);
    }

    public ApplicationDTO update(ApplicationDTO applicationDto) {
        return updateWithLambda(applicationDto.getId(), application -> {
            Application applicationToUpdate = fromDtoToEntity(applicationDto);
            applicationToUpdate.setRequestedBy(userService.fromDtoToUser(applicationDto.getRequestedBy()));
            applicationToUpdate.setStatus(Status.PENDING);
            return applicationToUpdate;
        });
//        Application application = applicationDao.save(applicationToUpdate);
        //      ApplicationDTO appDto = fromEntityToDto(application);
        //    appDto.setRequestedBy(applicationDto.getRequestedBy());
        //  return appDto;
    }

    public List<ApplicationDTO> getAll(UserPrincipal principal) {

        return principal.getAuthorities().stream()
                .map(Object::toString)
                .flatMap(s -> switchBasedOnRole(principal, s))
                .map(this::fromEntityToDto)
                .collect(Collectors.toList());

    }

    private Stream<? extends Application> switchBasedOnRole(UserPrincipal principal, String s) {
        if (s.equals(Role.ROLE_ADMIN.name())) {
            return applicationDao.findAll().stream();
        }else {
            return applicationDao.findAllByRequestedById(principal.getId()).stream();
        }
    }

    public ApplicationDTO fromEntityToDto(Application application) {
        ApplicationDTO appDto = new ApplicationDTO();
        appDto.setId(application.getId());
        appDto.setEndDate(application.getEndDate());
        appDto.setStartDate(application.getStartDate());
        appDto.setStatus(application.getStatus());
        appDto.setRequestedBy(userService.fromUserToDto(application.getRequestedBy()));
        return appDto;

    }

    public Application fromDtoToEntity(ApplicationDTO applicationDto) {
        Application application = new Application();
        application.setId(applicationDto.getId());
        application.setStartDate(applicationDto.getStartDate());
        application.setEndDate(applicationDto.getEndDate());
        application.setStatus(applicationDto.getStatus());
        return application;
    }


    public ApplicationDTO reject(Long id, UserPrincipal userPrincipal) {
        return updateWithLambda(id, setStatusToRejected());
    }

    public ApplicationDTO approve(Long id, UserPrincipal userPrincipal) {
        return updateWithLambda(id, setStatusToApproved());
    }

    private ApplicationDTO updateWithLambda(Long id, Function<Application, Application> updateLambda) {
        return applicationDao.findById(id)
                .map(updateLambda)
                .map(application -> applicationDao.save(application))
                .map(this::fromEntityToDto)
                .orElseThrow(RuntimeException::new);
    }

    private Function<Application, Application> setStatusToApproved() {
        return e -> {
            e.setStatus(Status.APROVED);
            return e;
        };
    }

    private Function<Application, Application> setStatusToRejected() {
        return e -> {
            e.setStatus(Status.REJECTED);
            return e;
        };
    }
}