import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LpgDTO {
  id?: number;
  lpg: number;
  date:string;
}
export interface CoDTO {
  id?: number;
  co: number;
  date:string;
}
export interface SmokeDTO {
  id?: number;
  smoke: number;
  date:string;
}
export interface GasSensorMq135 {
  id?: number;
  mq135: number;
  date: string;
}
export interface RfSensor {
  id?: number;
  rf: number;
  date: string;
}


@Component({
  selector: 'app-storico',
  templateUrl: './storico.component.html',
  styleUrls: ['./storico.component.css']
})
export class StoricoComponent implements OnInit {
gasSensor : LpgDTO;
gasSensor2 : GasSensorMq135;

products = [];
products2 = [];
products3 = [];
products4 = [];
products5 = [];
url = 'api/get-lpg';
url2 = 'api/get-mq135';
url3 = 'api/get-rf';
url4 = 'api/get-co';
url5 = 'api/get-smoke';
  dataSource= [];
  dataSource2=[];
  dataSource3=[];
  dataSource4=[];
  dataSource5=[];

constructor(public httpClient : HttpClient) { }
displayedColumns: string[] = ['id', 'mq2', 'mq135'];

  getData(): any[]{

       this.httpClient.get<any>(this.url).subscribe((data: any[]) => {
        console.log(data);
        this.products = data;
        this.dataSource = this.products;
        console.log(this.products)
      });
      return this.products;

  }
  getData2():any[]{
    this.httpClient.get<any>(this.url2).subscribe((data: any[]) => {
      console.log(data);
      this.products2 = data;
      this.dataSource2 = this.products2;
      console.log(this.products)
    });
  return this.products2;
  }
  getData3():any[]{
    this.httpClient.get<any>(this.url3).subscribe((data: any[]) => {
      console.log(data);
      this.products3 = data;
      this.dataSource3 = this.products3;
      console.log(this.products3)
    });
  return this.products3;
  }

  getData4():any[]{
    this.httpClient.get<any>(this.url4).subscribe((data: any[]) => {
      console.log(data);
      this.products4 = data;
      this.dataSource4 = this.products4;
      console.log(this.products4)
    });
  return this.products4;
  }


  getData5():any[]{
    this.httpClient.get<any>(this.url5).subscribe((data: any[]) => {
      console.log(data);
      this.products5 = data;
      this.dataSource5 = this.products5;
      console.log(this.products5)
    });
  return this.products5;
  }



  ngOnInit(): void {
    this.getData();
    this.getData2();
    this.getData3();
    this.getData4();
    this.getData5();
    console.log(this.dataSource)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;


  }

}
