import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FormJornadasComponent } from './components/jornadas/form-jornadas.component';



@NgModule({
  declarations: [
    JornadasComponent,
    FormJornadasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JornadasModule { }
