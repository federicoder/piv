package it.piv.demo.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Table(name ="rf", schema = "public")
@Entity
public class RfSensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "incrementDomain")
    @GenericGenerator(name = "incrementDomain", strategy = "increment")
    private Long id;
    @Column(name ="rf")
    private Long rf;
    @CreationTimestamp
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
