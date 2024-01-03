import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarreraTecnica } from '../../model/carrera-tecnica.model';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-register-aspirante',
  templateUrl: './form-register-aspirante.component.html',
  styles: [],
})
export class FormRegisterAspiranteComponent implements OnInit {
  ngOnInit(): void {
    // getCarrerasTecnicas();
  }

  public formRegisterAspirante: FormGroup;

  // para listar carreras en el formulario de formRegister
  // carrerasTecnicas: CarreraTecnica[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private carreraTecnicaService: CarreraTecnicaService,
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
    });
  }

  // getCarrerasTecnicas() {
  //   this.carreraTecnicaService.getCarreras().subscribe({
  //     next: (data: any) => {
  //       this.carrerasTecnicas = data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }


  onCancel(){
    this.dialogRegisterAspiranteRef.close(2);
  }

}
