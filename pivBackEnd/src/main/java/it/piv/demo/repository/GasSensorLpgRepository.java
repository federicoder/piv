package it.piv.demo.repository;

import it.piv.demo.domain.GasSensorLpg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GasSensorLpgRepository extends JpaRepository<GasSensorLpg, Long> {

}
