package com.application.BE.dto;

import com.application.BE.entities.Status;

import java.util.Date;

public class ApplicationDTO {

private long id;
    private Date startDate;

    private Date endDate;

    private Status status;

    private UserDTO requestedBy;

    public UserDTO getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(UserDTO userDTO) {
        this.requestedBy = userDTO;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }


    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
