package it.piv.demo.services.dto;

import java.util.Date;

public class RfSensorDto {
    private Long id;
    private Long rf;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRf() {
        return rf;
    }

    public void setRf(Long rf) {
        this.rf = rf;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
