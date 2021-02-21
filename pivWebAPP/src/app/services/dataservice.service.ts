import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { map, mapTo } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

type ServiceOptions = {
  characteristic: string;
  service: string,
  characteristic2?: string;
  service2?:string;
  decoder(value: DataView): Map<any,any> | {[key: string]: number }
};
type RequestDeviceOptions = {
  filters: BluetoothRequestDeviceFilter[];
  optionalServices?: BluetoothServiceUUID[];
} | {
  acceptAllDevices: boolean;
  optionalServices?: BluetoothServiceUUID[];
}
interface BluetoothRequestDeviceFilter {
  services?: BluetoothServiceUUID[];
  name?: string;
  namePrefix?: string;
  manufacturerId?: number;
  serviceDataUUID?: BluetoothServiceUUID;
}
@Injectable({
  providedIn: 'root'
})


export class DataserviceService {
    private _requestDevice : RequestDeviceOptions;
    private _filter : BluetoothRequestDeviceFilter;
    // tslint:disable-next-line: variable-name
    private _config: ServiceOptions;
    private _config2: ServiceOptions;

  device :any;

  constructor(public ble: BluetoothCore) { }

  config(options: ServiceOptions) {
    this._config = options;

  }

  configDevice(options: RequestDeviceOptions){
    this._requestDevice = options;
  }
  configFilter(options: BluetoothRequestDeviceFilter){
    this._filter = options;
  }
  config2(options2: ServiceOptions) {
    this._config2 = options2;

  }
  getDevice() {
    return this.ble.getDevice$();
  }

  stream() {
    return this.ble.streamValues$().pipe(
      map(this._config.decoder)
    );
  }

  stream2() {
    return this.ble.streamValues$().pipe(
      map(this._config.decoder)
    );
  }
  // stream2() {
  //   return this.ble.streamValues2$().pipe(
  //     mapTo(this._config2.decoder)
  //   );
  // }
  value() {
  return this.ble
      .value$({
        service: this._config.service,
        characteristic: this._config.characteristic,
      })

  }


  // values() {
  //   return this.ble
  //       .value$({
  //         service: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
  //         characteristic: 'beb5483e-36e1-4688-b7f5-ea07361b26a8',
  //         service2: '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
  //         characteristic2 : 'beb5483e-36e1-4688-b7f5-ea07361b26a8'
  //       });
  //     }
  disconnectDevice() {
    this.ble.disconnectDevice();
  }
  connectDevice(device : BluetoothDevice){
    return this.ble.connectDevice$(device);
  }

  discover(){
    return this.ble.discover$(this._requestDevice)
  }
}



