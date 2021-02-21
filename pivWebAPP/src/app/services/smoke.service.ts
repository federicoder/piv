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
export class SmokeService {
    // tslint:disable-next-line: variable-name
    private _config: ServiceOptions;
  device :any;

  constructor( public ble: BluetoothCore) { }

  config(options: ServiceOptions) {
    this._config = options;
  }
  getDevice() {
    return this.ble.getDevice$();
  }

  stream() {
    return this.ble.streamValues$().pipe(
      map(this._config.decoder)
    );
  }

  value() {
    return this.ble
      .value$({
        service: this._config.service,
        characteristic: this._config.characteristic,
      });
  }

  disconnectDevice() {
    this.ble.disconnectDevice();
  }
}




