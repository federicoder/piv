package it.piv.demo.services.dto;

import java.util.Date;

public class GasSensorSmokeDTO {
    private Long id;
    private Long smoke;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSmoke() {
        return smoke;
    }

    public void setSmoke(Long smoke) {
        this.smoke = smoke;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
