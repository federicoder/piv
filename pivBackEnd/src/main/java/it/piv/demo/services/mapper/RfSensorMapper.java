package it.piv.demo.services.mapper;

import it.piv.demo.domain.RfSensor;
import it.piv.demo.services.dto.RfSensorDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RfSensorMapper extends EntityMapper<RfSensorDto, RfSensor>{

}
