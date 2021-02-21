import { RfService } from './../../services/rf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService } from '@manekinekko/angular-web-bluetooth';
const BLE_SERVICE3 ="4fafc203-1fb5-459e-8fcc-c5c9c331914b"
const BLE_CHARACTERISTIC3="beb5483c-36e1-4688-b7f5-ea07361b26a8"
export const bleService3 = (d: BluetoothCore) => new RfService(d);
export const bleCore3 = (d: BrowserWebBluetooth, l: ConsoleLoggerService) => new BluetoothCore(d, l);

export interface RfDto{
  id?:number,
  rf?:number,
  data?:string
}

const PROVIDERS = [
  {
    provide: BluetoothCore,
    useFactory: bleCore3,
    deps: [BrowserWebBluetooth, ConsoleLoggerService]
  },
  {
    provide: RfService,
    useFactory: bleService3,
    deps: [BluetoothCore]
  }
]
@Component({
  selector: 'app-rf',
  templateUrl: './rf.component.html',
  styleUrls: ['./rf.component.css'],
  providers: PROVIDERS
})

export class RfComponent implements OnInit {
  @Input() item: any;
  int33: Int32Array;
  myMap3 = new Map();
  dto : RfDto;
  url3 : string = "api/save-rf"
  streamSubscription: Subscription;
  valuesSubscription :Subscription;
  deviceIsConnected : Boolean;
  constructor( public httpClient : HttpClient, public ble2 : RfService, public snackBar: MatSnackBar) {
    this.config()
  }

  config(){
    this.ble2.config({
      characteristic: BLE_CHARACTERISTIC3,
      service: BLE_SERVICE3,
      decoder: (value: DataView) => {
         this.int33 = new Int32Array(value.buffer);
        const rf = this.int33[0]
        this.myMap3.set("rf", rf)
        this.dto = {rf}
        this.item = this.myMap3
        console.log(this.myMap3)
        this.saveData(this.dto);
        return this.myMap3;
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
  saveData(gas: RfDto) {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify(gas);
    this.httpClient
      .post<RfDto>(this.url3, body, { headers: header })
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
