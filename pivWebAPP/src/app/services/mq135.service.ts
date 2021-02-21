import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

type ServiceOptions = {
  characteristic: string;
  service: string,
  decoder(value: DataView): Map<any,any> | {[key: string]: number}
};
@Injectable({
  providedIn: 'root',
})


export class Mq135Service {

    // tslint:disable-next-line: variable-name
    private _config2: ServiceOptions;
  device :any;

  constructor( public ble2: BluetoothCore) { }

  config(options: ServiceOptions) {
    this._config2 = options;
  }
  getDevice() {
    return this.ble2.getDevice$();
  }

  stream() {
    return this.ble2.streamValues$().pipe(
      map(this._config2.decoder)
    );
  }

  value() {
    return this.ble2
      .value$({
        service: this._config2.service,
        characteristic: this._config2.characteristic,
      });
  }

  disconnectDevice() {
    this.ble2.disconnectDevice();
  }
}



