import { Mq135Component } from './components/mq135/mq135.component';
import { Mq135Service } from './services/mq135.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularBleModule } from '@nebulae/angular-ble';
import { WebBluetoothModule, BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { BlealternativoComponent } from './components/blealternativo/blealternativo.component';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import {MatDialogModule} from '@angular/material/dialog';
import { MyallertComponent } from './components/util/myallert/myallert.component';
import { StoricoComponent } from './components/storico/storico.component';
import { DataserviceService } from './services/dataservice.service';
import { RfComponent } from './components/rf/rf.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SmokeComponent } from './components/smoke/smoke.component';
import { CoComponent } from './components/co/co.component';

@NgModule({
  declarations: [
    AppComponent,
    BlealternativoComponent,
    MyallertComponent,
    StoricoComponent,
    Mq135Component,
    RfComponent,
    SmokeComponent,
    CoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    }),
    AngularBleModule.forRoot(),
    BrowserAnimationsModule,

  ],
  providers: [Mq135Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
