import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { map } from 'rxjs/operators';
type ServiceOptions = {
  characteristic: string;
  service: string,
  decoder(value: DataView): Map<any,any> | {[key: string]: number}
};
@Injectable({
  providedIn: 'root'
})
export class RfService {
  private _config2: ServiceOptions;
  device :any;

  constructor( public ble3: BluetoothCore) { }

  config(options: ServiceOptions) {
    this._config2 = options;
  }
  getDevice() {
    return this.ble3.getDevice$();
  }

  stream() {
    return this.ble3.streamValues$().pipe(
      map(this._config2.decoder)
    );
  }

  value() {
    return this.ble3
      .value$({
        service: this._config2.service,
        characteristic: this._config2.characteristic,
      });
  }

  disconnectDevice() {
    this.ble3.disconnectDevice();
  }
}

