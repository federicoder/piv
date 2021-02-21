import { Mq135Component } from './../mq135/mq135.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Mq135Service } from './../../services/mq135.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataserviceService } from './../../services/dataservice.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyallertComponent } from '../util/myallert/myallert.component';
import { Router } from '@angular/router';

const BLE_SERVICE = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const BLE_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
const BLE_SERVICE2 = '4fafc202-1fb5-459e-8fcc-c5c9c331914b';
const BLE_CHARACTERISTIC2 = 'beb5483d-36e1-4688-b7f5-ea07361b26a8';
export interface DialogData {
  sensorData: number | number;
}
export interface LpgDTO {
  id?: number;
  lpg?: number;
  date?: string;
}
interface BluetoothRequestDeviceFilter {
  services?: BluetoothServiceUUID[];
  name?: string;
  namePrefix?: string;
  manufacturerId?: number;
  serviceDataUUID?: BluetoothServiceUUID;
}


@Component({
  selector: 'app-blealternativo',
  templateUrl: './blealternativo.component.html',
  styleUrls: ['./blealternativo.component.css'],
  providers: [BluetoothCore],
})
export class BlealternativoComponent implements OnInit, OnDestroy {
  requestDeviceOptions :RequestDeviceOptions
  bluetoothRequestDeviceFilter :BluetoothRequestDeviceFilter[]
  bluetoothRequestDevice : BluetoothRequestDeviceFilter
  tag: Mq135Component;
  something: boolean = false;
  boolean: Boolean = false;
  array16: ArrayBuffer;
  int33: Int32Array;
  device: any;
  deviceName : any;
  @Output()
  somethingChanged = new EventEmitter();
  evento = new EventEmitter();
  mq135value: Mq135Component;
  items = [];
  valore: any;
  dto: LpgDTO;
  products = [];
  url = 'api/get-data';
  url2 = 'api/save-lpg';
  myMap = new Map();
  myMap2 = new Map();
  streamSubscription: Subscription;
  streamSubscriptio2 : Subscription;
  valuesSubscription2: Subscription;
  deviceConnected: Observable<BluetoothDevice>;
  valuesSubscription: Subscription;
  deviceIsConnected :boolean;
  connect : String  = '';
  @ViewChild(Mq135Component)
  tab: Mq135Component;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public ble2: Mq135Service,
    public ble: DataserviceService,
    public snackBar: MatSnackBar,
    public httpClient: HttpClient
  ) {
    this.config();
    // this.config2();
  }
  addItem(newItem: any) {
    this.items.push(newItem);
  }
  // newChange(): void {
  //   this.router.navigateByUrl('data');
  // }

  //For popup
  doSomething() {
    this.something = true;
    this.somethingChanged.emit(this.something);
  }

  openDialog() {
    this.dialog.open(MyallertComponent, {
      data: {
        allert: 'mq2',
      },
    });
  }
// config2(){
//   this.ble.config2({
//     characteristic: BLE_CHARACTERISTIC2,
//     service: BLE_SERVICE2,
//     decoder: (value2: DataView) => {
//       console.log(value2)
//       var int35 = new Int32Array(value2.buffer);
//       const mq135 = int35[0];
//       this.myMap2.set('mq135', mq135);
//       console.log(this.myMap2);
//       return this.myMap2;
//     }}
//     );
// }
  config() {
    this.deviceIsConnected = true;
    this.ble.config({
      characteristic: BLE_CHARACTERISTIC,
      service: BLE_SERVICE,
      decoder: (value: DataView) => {
        console.log('il mio oggetto array restituito ', value)
        // const mq2 = value.getUint8(0);
        // const mq135 = value.getUint8(1)
        var int32 = new Int32Array(value.buffer);
        const lpg = int32[0];

        // const mq135 = int32[0]
        this.myMap.set('lpg', lpg);

        console.log(this.myMap);
        this.dto = { lpg };
        this.saveData(this.dto)
        //this.saveData(this.dto);
        if (this.myMap.get('lpg') >= 8000) {
          this.openDialog();
        }
        return this.myMap;
      }
    });
  }

  ngOnInit(): void {
    this.streamSubscription = this.ble.stream().subscribe(
      () => this.updateValue.bind(this),
      (error) => this.hasError.bind(this)
    );
    const string  = 'ESP32'
    this.ble.configDevice(this.requestDeviceOptions)
      this.ble.connectDevice(this.device);

      // this.ble.discover().subscribe(res => res)
  }

  //for http rest request:
  getData() {
    console.log('ciao');
    return this.httpClient.get<any>(this.url).subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }

  saveData(gas: LpgDTO) {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    const body = JSON.stringify(gas);
    this.httpClient
      .post<LpgDTO>(this.url2, body, { headers: header })
      .subscribe((data) => {
        data;
      });
  }
  //end for http rest Request

  requestValue() {
    this.deviceIsConnected = true;

    this.deviceConnected = this.device = this.ble.getDevice();
    this.device = this.ble.getDevice().subscribe(val => this.deviceName = val.name+" is connected!")

    this.valuesSubscription = this.ble.value().subscribe(
      (res) => res
      ,
      (error) => this.hasError.bind(this)
    )
  }

  updateValue(value: Map<any, any>) {
    console.log('Reading data %d', value);
  }

  hasError(error: string) {
    this.snackBar.open(error, 'Close');
  }

  disconnect() {
    this.deviceIsConnected = false;
    this.ble.disconnectDevice();
    this.device = null
    this.valuesSubscription2.unsubscribe();
    this.valuesSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.valuesSubscription.unsubscribe();
    this.streamSubscription.unsubscribe();
    this.device.unsubscribe();
  }
}
