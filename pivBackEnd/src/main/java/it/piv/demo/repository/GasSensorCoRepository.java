package it.piv.demo.repository;
import it.piv.demo.domain.GasSensorCo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface GasSensorCoRepository extends JpaRepository<GasSensorCo, Long> {
}
