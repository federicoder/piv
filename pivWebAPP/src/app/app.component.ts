import { Component, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { OnInit } from '@angular/core';
import { BluetoothService } from '@nebulae/angular-ble';
import { delay } from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
export interface GasSensor {
  id?: number;
  mq2: number;
  mq135: number;
}

export interface OptionsData {
  startByte: number;
  stopByte: number;
}
const BLE_SERVICE = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const BLE_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  results = [];
  title = 'pivWebAPP';
  products = [];
  url = 'api/get-data';
  url2 = 'api/save-data';
  gasSensor: GasSensor;
  optionsData: OptionsData;
  postId: number;
  public dati :any = {};
   obs = new Observable((observer) => {
     this.myMap
  })
  //const for ble:
  // Current device status
  deviceConnected = false;

  //end const for ble

  map = new Map();
  valore: string;
  peripheral: any;
  output: DataView;
  c: number = 0;
  i:number = 0;
  values: DataView;
  myMap= new Map();
  myBuffer : ArrayBuffer;
  myObserver : Observable<any>;
  one: any;
  constructor(

    public zone: NgZone,
    private httpClient: HttpClient,
    private bluetoothService: BluetoothService
  ) {

  }

  ngOnInit(): void {
    // this.bluetoothService.getDevice$().subscribe((device) => {
    //   this.deviceConnected = device ? true : false;
    // });
  }


//   connectToDevice() {


//     this.zone.run(() => {

//     this.bluetoothService.connectDevice$().subscribe((res) => {


//         console.log('starting to notifing...');
//         let optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'];

//         this.startNotifier().subscribe(res => {
//             console.log(res)

//           })

//     });
//   })





//   }
//   async delay(ms: number) {
//     await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
// }

//   disconnectToDevice() {
//     this.bluetoothService.disconnectDevice();
//   }


//   startNotifier():  Observable<any> {
//   return  new Observable<any> (() => {
//     let optionalServices: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'];
//     this.bluetoothService
//        .startNotifierListener$(BLE_SERVICE, BLE_CHARACTERISTIC, 0)
//        .subscribe((result) =>{
//          this.bluetoothService
//         .readDeviceValue$(BLE_SERVICE, BLE_CHARACTERISTIC)
//         .subscribe((data) => {
//           console.log('stream value: ', data);

//            this.onChange(data.buffer)
//         })
//        })
// });

//   }


//   async readD(myMap) : Promise<any> {
//     return new Promise<any> (() => {this.bluetoothService
//         .readDeviceValue$(BLE_SERVICE, BLE_CHARACTERISTIC)
//         .subscribe((result) => {
//           myMap = this.onChange(result.buffer);
//           console.log('stream value: ', result);

//         })
//       })
//     }


//   getData() {
//     console.log('ciao');
//     return this.httpClient.get<any>(this.url).subscribe((data: any[]) => {
//       console.log(data);
//       this.products = data;
//     });
//   }

//   saveData() {
//     const header = new HttpHeaders().set('Content-type', 'application/json');
//     this.map.set('mq2', 1234);
//     this.map.set('mq135', 213123);
//     let p: GasSensor = { mq2: 1213131, mq135: 555555 };
//     const body = JSON.stringify(p);
//     this.httpClient
//       .post<GasSensor>(this.url2, body, { headers: header })
//       .subscribe((data) => {
//         data;
//       });
//   }


//   onChange(buffer :ArrayBuffer) : DataView {
//     var data = new Uint8Array(buffer);
//     this.dati = data
//     this.zone.run(() => {

//       this.myMap.set("Mq2", this.dati[1]);
//   this.myMap.set("Mq135", this.dati[0]);
//   console.log(this.myMap)
//   this.myObserver.subscribe((observer) => {this.myMap})
// })
// return new DataView(buffer);

//   }


}
