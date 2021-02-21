package it.piv.demo.services.mapper;

import it.piv.demo.domain.GasSensorCo;
import it.piv.demo.services.dto.GasSensorCoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GasSensorCoMapper extends EntityMapper<GasSensorCoDTO, GasSensorCo>{
}
