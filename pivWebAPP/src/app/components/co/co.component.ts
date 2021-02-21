import { RfService } from './../../services/rf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService } from '@manekinekko/angular-web-bluetooth';
const BLE_SERVICE4 ="4fafc204-1fb5-459e-8fcc-c5c9c331914b"
const BLE_CHARACTERISTIC4="beb5483b-36e1-4688-b7f5-ea07361b26a8"
export const bleService4 = (e: BluetoothCore) => new RfService(e);
export const bleCore4 = (e: BrowserWebBluetooth, l: ConsoleLoggerService) => new BluetoothCore(e, l);

export interface CoDTO{
  id?:number,
  co?:number,
  data?:string
}

const PROVIDERS = [
  {
    provide: BluetoothCore,
    useFactory: bleCore4,
    deps: [BrowserWebBluetooth, ConsoleLoggerService]
  },
  {
    provide: RfService,
    useFactory: bleService4,
    deps: [BluetoothCore]
  }
]
@Component({
  selector: 'app-co',
  templateUrl: './co.component.html',
  styleUrls: ['./co.component.css'],
  providers: PROVIDERS

})
export class CoComponent implements OnInit {
  @Input() item: any;
  int33: Int32Array;
  myMap4 = new Map();
  dto : CoDTO;
  url3 : string = "api/save-co"
  streamSubscription: Subscription;
  valuesSubscription :Subscription;
  deviceIsConnected : Boolean;
  constructor( public httpClient : HttpClient, public ble2 : RfService, public snackBar: MatSnackBar) {
    this.config()
  }
  config(){
    this.ble2.config({
      characteristic: BLE_CHARACTERISTIC4,
      service: BLE_SERVICE4,
      decoder: (value: DataView) => {
         this.int33 = new Int32Array(value.buffer);
        const co = this.int33[0]
        this.myMap4.set("co", co)
        this.dto = {co}
        this.item = this.myMap4
        console.log(this.myMap4)
        this.saveData(this.dto);
        return this.myMap4;
      }
    });

  }

  ngOnInit(): void {
    this.streamSubscription = this.ble2.stream()
    .subscribe( () => this.updateValue.bind(this), error => this.hasError.bind(this));
  }

  requestValue() {
    this.deviceIsConnected=true;
    this.valuesSubscription = this.ble2.value()
    .subscribe( (res1) => res1
    , (error) => this.hasError.bind(this));
    console.log(this.valuesSubscription)
  }
  saveData(gas: CoDTO) {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify(gas);
    this.httpClient
      .post<CoDTO>(this.url3, body, { headers: header })
      .subscribe((data) => {
        data;
      });
  }
  updateValue(value: Map<any,any>) {
    console.log('Reading data %d', value);
  }

  hasError(error: string) {
    this.snackBar.open(error, 'Close');
  }
  disconnect() {
    this.deviceIsConnected=false;
    this.ble2.disconnectDevice();
    this.valuesSubscription.unsubscribe();
  }
  ngOnDestroy() {
  this.valuesSubscription.unsubscribe();
  this.streamSubscription.unsubscribe();
  }


}
