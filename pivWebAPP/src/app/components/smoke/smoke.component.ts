import { RfService } from './../../services/rf.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BluetoothCore, BrowserWebBluetooth, ConsoleLoggerService } from '@manekinekko/angular-web-bluetooth';
const BLE_SERVICE5 ="4fafc205-1fb5-459e-8fcc-c5c9c331914b"
const BLE_CHARACTERISTIC5="beb5483a-36e1-4688-b7f5-ea07361b26a8"
export const bleService5 = (g: BluetoothCore) => new RfService(g);
export const bleCore5 = (g: BrowserWebBluetooth, l: ConsoleLoggerService) => new BluetoothCore(g, l);

export interface SmokeDTO{
  id?:number,
  smoke?:number,
  data?:string
}

const PROVIDERS = [
  {
    provide: BluetoothCore,
    useFactory: bleCore5,
    deps: [BrowserWebBluetooth, ConsoleLoggerService]
  },
  {
    provide: RfService,
    useFactory: bleService5,
    deps: [BluetoothCore]
  }
]

@Component({
  selector: 'app-smoke',
  templateUrl: './smoke.component.html',
  styleUrls: ['./smoke.component.css'],
  providers: PROVIDERS

})
export class SmokeComponent implements OnInit {
  @Input() item: any;
  int33: Int32Array;
  myMap5 = new Map();
  dto : SmokeDTO;
  url3 : string = "api/save-smoke"
  streamSubscription: Subscription;
  valuesSubscription :Subscription;
  deviceIsConnected : Boolean;
  constructor( public httpClient : HttpClient, public ble2 : RfService, public snackBar: MatSnackBar) {
    this.config()
  }
  config(){
    this.ble2.config({
      characteristic: BLE_CHARACTERISTIC5,
      service: BLE_SERVICE5,
      decoder: (value: DataView) => {
         this.int33 = new Int32Array(value.buffer);
        const smoke = this.int33[0]
        this.myMap5.set("smoke", smoke)
        this.dto = {smoke}
        this.item = this.myMap5
        console.log(this.myMap5)
        this.saveData(this.dto);
        return this.myMap5;
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
  saveData(gas: SmokeDTO) {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify(gas);
    this.httpClient
      .post<SmokeDTO>(this.url3, body, { headers: header })
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

