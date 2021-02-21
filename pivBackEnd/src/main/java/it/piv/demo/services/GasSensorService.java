package it.piv.demo.services;

import it.piv.demo.domain.*;
import it.piv.demo.repository.*;
import it.piv.demo.services.dto.*;
import it.piv.demo.services.mapper.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class GasSensorService {
    private final GasSensorLpgMapper gasSensorLpgMapper;
    private final GasSensorLpgRepository gasSensorLpgRepository;
    private final GasSensorMq135Repository gasSensorMq135Repository;
    private final GasSensorMq135Mapper gasSensorMq135Mapper;
    private final RfSensorMapper rfSensorMapper;
    private final RfSensorRepository rfSensorRepository;
    private final GasSensorCoRepository gasSensorCoRepository;
    private final GasSensorCoMapper gasSensorCoMapper;
    private final GasSensorSmokeMapper gasSensorSmokeMapper;
    private final GasSensorSmokeRepository gasSensorSmokeRepository;

    public GasSensorService(GasSensorLpgMapper gasSensorLpgMapper,
                            GasSensorLpgRepository gasSensorLpgRepository,
                            GasSensorMq135Repository gasSensorMq135Repository,
                            GasSensorMq135Mapper gasSensorMq135Mapper,
                            RfSensorMapper rfSensorMapper,
                            RfSensorRepository rfSensorRepository,
                            GasSensorCoRepository gasSensorCoRepository,
                            GasSensorCoMapper gasSensorCoMapper,
                            GasSensorSmokeMapper gasSensorSmokeMapper,
                            GasSensorSmokeRepository gasSensorSmokeRepository) {
        this.gasSensorLpgMapper = gasSensorLpgMapper;
        this.gasSensorLpgRepository = gasSensorLpgRepository;
        this.gasSensorMq135Repository = gasSensorMq135Repository;
        this.gasSensorMq135Mapper = gasSensorMq135Mapper;
        this.rfSensorMapper = rfSensorMapper;
        this.rfSensorRepository = rfSensorRepository;
        this.gasSensorCoRepository = gasSensorCoRepository;
        this.gasSensorCoMapper = gasSensorCoMapper;
        this.gasSensorSmokeMapper = gasSensorSmokeMapper;
        this.gasSensorSmokeRepository = gasSensorSmokeRepository;
    }

    @Transactional
    public void saveGasSensorLpg(GasSensorLpgDTO gasSensorLpgDTO) {
        GasSensorLpg gasSensorLpg = gasSensorLpgMapper.toEntity(gasSensorLpgDTO);
        gasSensorLpgRepository.save(gasSensorLpg);
    }
    @Transactional
    public void saveGasSensorCo(GasSensorCoDTO gasSensorCoDTO) {
        GasSensorCo gasSensorCo = gasSensorCoMapper.toEntity(gasSensorCoDTO);
        gasSensorCoRepository.save(gasSensorCo);
    }

    @Transactional
    public void saveGasSensorSmoke(GasSensorSmokeDTO gasSensorSmokeDTO) {
        GasSensorSmoke gasSensorSmoke = gasSensorSmokeMapper.toEntity(gasSensorSmokeDTO);
        gasSensorSmokeRepository.save(gasSensorSmoke);
    }

    @Transactional
    public void saveGasSensorMq135(GasSensorMq135DTO gasSensorMq135DTO) {
        GasSensorMq135 gasSensorMq135 = gasSensorMq135Mapper.toEntity(gasSensorMq135DTO);
        gasSensorMq135Repository.save(gasSensorMq135);
    }

    @Transactional
    public void saveRfSensor(RfSensorDto rfSensorDto) {
        RfSensor rfSensor = rfSensorMapper.toEntity(rfSensorDto);
        rfSensorRepository.save(rfSensor);
    }

    public List<GasSensorLpgDTO> allMeasurementsLpg() {
        List<GasSensorLpg> outputLpg = gasSensorLpgRepository.findAll();
        return gasSensorLpgMapper.toDto(outputLpg);
    }

    public List<GasSensorCoDTO> allMeasurementsCo() {
        List<GasSensorCo> outputCo = gasSensorCoRepository.findAll();
        return gasSensorCoMapper.toDto(outputCo);
    }

    public List<GasSensorSmokeDTO> allMeasurementsSmoke() {
        List<GasSensorSmoke> outputSmoke = gasSensorSmokeRepository.findAll();
        return gasSensorSmokeMapper.toDto(outputSmoke);
    }

    public List<GasSensorMq135DTO> allMeasurementsMq135() {
        List<GasSensorMq135> outputMq135 = gasSensorMq135Repository.findAll();
        return gasSensorMq135Mapper.toDto(outputMq135);
    }

    public List<RfSensorDto> allMeasurementsRf() {
        List<RfSensor> rfSensors = rfSensorRepository.findAll();
        return rfSensorMapper.toDto(rfSensors);
    }
}
