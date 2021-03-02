import { Mq135Service } from 'src/app/services/mq135.service';
import { Mq135Component } from './../../components/mq135/mq135.component';
import { DataserviceService } from './../../services/dataservice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from 'src/app/app.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AngularBleModule } from '@nebulae/angular-ble';
import { WebBluetoothModule, BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({

  declarations: [
  //   Mq135Component,
  // Mq135Service
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    CommonModule
  ]
})
export class BlemoduleModule {
  public static forRoot(): AppModule {
    return {
        ngModule: BlemoduleModule,
        providers: [BluetoothCore, DataserviceService, Mq135Component]
    };
}
 }
