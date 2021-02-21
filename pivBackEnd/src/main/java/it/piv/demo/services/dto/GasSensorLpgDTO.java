package it.piv.demo.services.dto;


import java.util.Date;

public class GasSensorLpgDTO {
    private Long id;
    private Long lpg;
    private Date date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLpg() {
        return lpg;
    }

    public void setLpg(Long lpg) {
        this.lpg = lpg;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
