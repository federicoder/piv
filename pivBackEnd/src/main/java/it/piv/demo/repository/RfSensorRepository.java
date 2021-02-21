package it.piv.demo.repository;

import it.piv.demo.domain.RfSensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RfSensorRepository extends JpaRepository<RfSensor,Long > {
}
