package it.piv.demo.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Table(name ="gassensorsmoke", schema = "public")
@Entity
public class GasSensorSmoke {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "incrementDomain")
    @GenericGenerator(name = "incrementDomain", strategy = "increment")
    private Long id;
    @Column(name ="smoke")
    private Long smoke;
    @CreationTimestamp
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
