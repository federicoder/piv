package it.piv.demo.repository;
import it.piv.demo.domain.GasSensorSmoke;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GasSensorSmokeRepository extends JpaRepository<GasSensorSmoke, Long> {
}
