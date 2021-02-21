package it.piv.demo.services.dto;

import java.util.Date;

public class GasSensorCoDTO {
    private Long id;
    private Long co;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCo() {
        return co;
    }

    public void setCo(Long co) {
        this.co = co;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
