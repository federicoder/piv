import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService } from '@manekinekko/angular-web-bluetooth';
import { BluetoothService } from '@nebulae/angular-ble';
import { Subscription } from 'rxjs';
import { DataserviceService } from 'src/app/services/dataservice.service';


import { Mq135Service } from 'src/app/services/mq135.service';
const BLE_SERVICE2 ="4fafc202-1fb5-459e-8fcc-c5c9c331914b"
const BLE_CHARACTERISTIC2="beb5483d-36e1-4688-b7f5-ea07361b26a8"

const BLE_SERVICE = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const BLE_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
export const bleService2 = (c: BluetoothCore) => new Mq135Service(c);
export const bleCore2 = (c: BrowserWebBluetooth, l: ConsoleLoggerService) => new BluetoothCore(c, l);
export type RequestDeviceOptions = {
  acceptAllDevices: boolean,
  optionalServices?: BluetoothServiceUUID[];
};
export interface GasSensorMq135 {
  id?: number;
  mq135?: number;
}
export interface ByteStartEnd{
  startByte: number,
  stopByte:number
}
export interface LengthPosition{
  start? : number,
  end?:number,
  lengthPadding?:number
}
export interface Options {
  byte: ByteStartEnd;
  lengthPosition?: LengthPosition;
}

const PROVIDERS = [
  {
    provide: BluetoothCore,
    useFactory: bleCore2,
    deps: [BrowserWebBluetooth, ConsoleLoggerService]
  },
  {
    provide: Mq135Service,
    useFactory: bleService2,
    deps: [BluetoothCore]
  }
]
@Component({
  selector: 'app-mq135',
  templateUrl: './mq135.component.html',
  styleUrls: ['./mq135.component.css'],
  providers : PROVIDERS

})
export class Mq135Component implements OnInit, OnDestroy {
  @Input() item: any;
  int33 : Int32Array;
  myMap = new Map();
  url2: string = 'api/save-mq135'
  streamSubscription2: Subscription;
  valuesSubscription2 :Subscription;
  valuesSubscription: Subscription;
  deviceConnected : Boolean = false;
  dto : GasSensorMq135;
  bluetoothServiceUUID : BluetoothServiceUUID[] = ["4fafc202-1fb5-459e-8fcc-c5c9c331914b", '4fafc201-1fb5-459e-8fcc-c5c9c331914b']
  deviceIsConnected : Boolean = false;
  request: RequestDeviceOptions;
  service : string = "4fafc202-1fb5-459e-8fcc-c5c9c331914b"
  service2 : string = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
  options : Options;
  @Output() myEvent = new EventEmitter();

  constructor( public httpClient : HttpClient, public ble2 : Mq135Service, public  ble : BluetoothService, public snackBar: MatSnackBar) {
    this.config2()
   }
   config2(){
    this.ble2.config({
      characteristic: BLE_CHARACTERISTIC2,
      service: BLE_SERVICE2,
      decoder: (value2: DataView) => {
         this.int33 = new Int32Array(value2.buffer);
        const mq135 = this.int33[0]
        this.myMap.set("mq135", mq135)
        this.dto = { mq135}
        this.item = this.myMap
        console.log(this.myMap)
        this.saveData(this.dto);
        return this.myMap;
      }
    });

  }
  ngOnInit(): void {

    this.ble2.getDevice().subscribe(device => {
      this.deviceConnected = device? true : false;
    });
    this.streamSubscription2 = this.ble2.stream()
    .subscribe( () => this.updateValue.bind(this), error => this.hasError.bind(this));
  }
  requestValue() {
    this.deviceIsConnected = true;
  //  this.valuesSubscription = this.startNotifier()
  //  console.log(this.valuesSubscription)
    this.valuesSubscription2 = this.ble2.value()
    .subscribe( (res1) => res1
    , (error) => this.hasError.bind(this));
    console.log(this.valuesSubscription2)

    console.log('lalalalalall' + this.valuesSubscription2)
    this.myEvent.emit(null)
  }

  startNotifier(){

    return this.ble.readDeviceValue$(BLE_SERVICE,BLE_CHARACTERISTIC).subscribe(result => {
      result
      console.log('stream value: ', result);
    });
  }

updateValue(value: Map<any,any>) {
  console.log('Reading data %d', value);
}

hasError(error: string) {
  this.snackBar.open(error, 'Close');
}
disconnect() {
  this.deviceIsConnected = false;
  this.ble2.disconnectDevice();
  this.valuesSubscription2.unsubscribe();
}
ngOnDestroy() {
this.valuesSubscription2.unsubscribe();
this.streamSubscription2.unsubscribe();
}

saveData(gas: GasSensorMq135) {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  const body = JSON.stringify(gas);
  this.httpClient
    .post<GasSensorMq135>(this.url2, body, { headers: header })
    .subscribe((data) => {
      data;
    });
}
}
