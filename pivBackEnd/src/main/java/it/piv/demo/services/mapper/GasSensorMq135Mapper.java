package it.piv.demo.services.mapper;

import it.piv.demo.domain.GasSensorMq135;
import it.piv.demo.services.dto.GasSensorMq135DTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GasSensorMq135Mapper extends EntityMapper<GasSensorMq135DTO, GasSensorMq135>{
}
