package it.piv.demo.services.mapper;

import it.piv.demo.domain.GasSensorSmoke;
import it.piv.demo.services.dto.GasSensorSmokeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GasSensorSmokeMapper extends EntityMapper<GasSensorSmokeDTO, GasSensorSmoke>{
}
