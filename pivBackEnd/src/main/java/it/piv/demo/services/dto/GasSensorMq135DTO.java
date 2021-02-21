package it.piv.demo.services.dto;

import java.util.Date;

public class GasSensorMq135DTO{
    private Long id;
    private Long mq135;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMq135() {
        return mq135;
    }

    public void setMq135(Long mq135) {
        this.mq135 = mq135;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
