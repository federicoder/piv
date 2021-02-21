package it.piv.demo.services.mapper;

import it.piv.demo.domain.GasSensorLpg;
import it.piv.demo.services.dto.GasSensorLpgDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GasSensorLpgMapper extends EntityMapper<GasSensorLpgDTO, GasSensorLpg> {


}
