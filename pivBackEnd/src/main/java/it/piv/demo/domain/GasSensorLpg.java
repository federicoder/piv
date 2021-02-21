package it.piv.demo.domain;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Table(name ="gassensorlpg", schema = "public")
@Entity
public class GasSensorLpg implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "incrementDomain")
    @GenericGenerator(name = "incrementDomain", strategy = "increment")
    private Long id;
    @Column(name ="lpg")
    private Long lpg;
    @CreationTimestamp
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
