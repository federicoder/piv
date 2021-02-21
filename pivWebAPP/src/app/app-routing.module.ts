import { StoricoComponent } from './components/storico/storico.component';
import { BlealternativoComponent } from './components/blealternativo/blealternativo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: BlealternativoComponent },
  { path: 'data', component: StoricoComponent },



];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
