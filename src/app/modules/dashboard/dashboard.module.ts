import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './components/home/home.component';
import { CarrerasTecnicasModule } from '../carreras-tecnicas/carreras-tecnicas.module';
import { ExamenesAdmisionModule } from '../examenes-admision/examenes-admision.module';
import { LoginModule } from '../login/login.module';
import { JornadasModule } from '../jornadas/jornadas.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    CarrerasTecnicasModule,
    ExamenesAdmisionModule,
    LoginModule,
    JornadasModule
  ]
})
export class DashboardModule { }
