package it.piv.demo.web.rest;

import it.piv.demo.services.GasSensorService;
import it.piv.demo.services.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class  GasSensorResource {
    @Autowired
    GasSensorService gasSensorService;
    @PostMapping("/save-lpg")
    public void saveGasSensorLpg(@RequestBody GasSensorLpgDTO gasSensorLpgDTO){
        gasSensorService.saveGasSensorLpg(gasSensorLpgDTO);
    }

    @PostMapping("/save-co")
    public void saveGasSensorCo(@RequestBody GasSensorCoDTO gasSensorCoDTO){
        gasSensorService.saveGasSensorCo(gasSensorCoDTO);
    }

    @PostMapping("/save-smoke")
    public void saveGasSensorSmoke(@RequestBody GasSensorSmokeDTO gasSensorSmokeDTO){
        gasSensorService.saveGasSensorSmoke(gasSensorSmokeDTO);
    }


    @PostMapping("/save-mq135")
    public void saveGasSensorMq2(@RequestBody GasSensorMq135DTO gasSensorMq135DTO){
        gasSensorService.saveGasSensorMq135(gasSensorMq135DTO);
    }
    @PostMapping("/save-rf")
    public void saveGasSensorMq2(@RequestBody RfSensorDto rfSensorDto){
        gasSensorService.saveRfSensor(rfSensorDto);
    }
    @GetMapping("/get-lpg")
    public List<GasSensorLpgDTO> getAllMeasurementsLpg(){
        return gasSensorService.allMeasurementsLpg();
    }
    @GetMapping("/get-co")
    public List<GasSensorCoDTO> getAllMeasurementsCo(){
        return gasSensorService.allMeasurementsCo();
    }
    @GetMapping("/get-smoke")
    public List<GasSensorSmokeDTO> getAllMeasurementsSmoke(){
        return gasSensorService.allMeasurementsSmoke();
    }
    @GetMapping("/get-mq135")
    public List<GasSensorMq135DTO> getAllMeasurementsMq135(){
        return gasSensorService.allMeasurementsMq135();
    }
    @GetMapping("/get-rf")
    public List<RfSensorDto> getAllMeasurementsRf(){
        return gasSensorService.allMeasurementsRf();
    }
}
