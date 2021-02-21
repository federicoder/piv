package it.piv.demo.repository;

import it.piv.demo.domain.GasSensorMq135;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GasSensorMq135Repository extends JpaRepository<GasSensorMq135, Long> {
}
