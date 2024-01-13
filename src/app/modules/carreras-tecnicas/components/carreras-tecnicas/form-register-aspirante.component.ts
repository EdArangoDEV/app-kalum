import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarreraTecnica } from '../../model/carrera-tecnica.model';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Jornada } from 'src/app/modules/jornadas/model/jornada.model';
import { JornadaService } from 'src/app/modules/shared/services/jornada.service';
import { ExamenesAdmisionService } from 'src/app/modules/shared/services/examenes-admision.service';
import { ExamenAdmision } from 'src/app/modules/examenes-admision/model/examen-admision.model';

@Component({
  selector: 'app-form-register-aspirante',
  templateUrl: './form-register-aspirante.component.html',
  styles: [],
})
export class FormRegisterAspiranteComponent implements OnInit {
  ngOnInit(): void {
    this.getJornadas();
    this.getExamenesAdmision();
    this.getCarrerasTecnicas();
  }

  public formRegisterAspirante: FormGroup;

  // para listar carreras en el formulario de formRegister
  carrerasTecnicas: CarreraTecnica[] = [];
  jornadas: Jornada[] = [];
  examenes: ExamenAdmision[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private carreraTecnicaService: CarreraTecnicaService,
    private jornadaService: JornadaService,
    private examenAdmisionService: ExamenesAdmisionService,
    private dialogRegisterAspiranteRef: MatDialogRef<FormRegisterAspiranteComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.formRegisterAspirante = this.formBuilder.group({
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      carreraId: [data != null ? data.carreraId : '', Validators.required],
      nombreCarrera: [data != null ? data.nombre : '', Validators.required],
      examenId: [data != null ? data.examenId : '', Validators.required],
      fechaExamen: [data != null ? data.fechaExamen : '', Validators.required],
      jornadaId: [data != null ? data.jornadaId : '', Validators.required],
      descripcion: [data != null ? data.descripcion: '', Validators.required],
    });
  }

  getCarrerasTecnicas() {
    this.carreraTecnicaService.getCarreras().subscribe({
      next: (data: any) => {
        this.carrerasTecnicas = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getJornadas(){
    this.jornadaService.getJornadas().subscribe({
      next: (data: any) => {
        this.jornadas = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getExamenesAdmision(){
    this.examenAdmisionService.getExamenes().subscribe({
      next: (data: any) => {
        this.examenes = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  onCancel(){
    this.dialogRegisterAspiranteRef.close(2);
  }

}
