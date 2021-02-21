package it.piv.demo.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Table(name ="gassensorco", schema = "public")
@Entity
public class GasSensorCo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "incrementDomain")
    @GenericGenerator(name = "incrementDomain", strategy = "increment")
    private Long id;
    @Column(name ="co")
    private Long co;
    @CreationTimestamp
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
