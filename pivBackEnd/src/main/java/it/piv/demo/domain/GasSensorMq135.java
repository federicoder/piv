package it.piv.demo.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Table(name ="gassensormq135", schema = "public")
@Entity
public class GasSensorMq135 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "incrementDomain")
    @GenericGenerator(name = "incrementDomain", strategy = "increment")
    private Long id;
    @Column(name ="mq135")
    private Long mq135;
    @CreationTimestamp
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
