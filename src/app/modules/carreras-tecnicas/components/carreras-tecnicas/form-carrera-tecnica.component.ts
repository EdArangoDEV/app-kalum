import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarreraTecnicaService } from 'src/app/modules/shared/services/carrera-tecnica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styles: [],
})
export class FormCarreraTecnicaComponent implements OnInit {
  // formulario para carreras tecnicas
  public carreraTecnicaFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carreraTecnicaService: CarreraTecnicaService,
    private dialogRef: MatDialogRef<FormCarreraTecnicaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.carreraTecnicaFormGroup = this.formBuilder.group({
      nombre: [data != null ? data.nombre : '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSave() {
    let dataForm = {
      nombre: this.carreraTecnicaFormGroup.get('nombre')?.value,
    };

    if (this.data != null) {
      this.carreraTecnicaService
        .updateCarreraTecnica({
          carreraId: this.data.carreraId,
          nombre: dataForm.nombre,
        })
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Carreras Técnicas',
              text: `Se actualizo correctamente la carrera a: ${dataForm.nombre}.`,
              footer: '<a href="">Kalum-app v1.0.0</a>',
            }).then((result) => {
              if (result.isConfirmed) {
                this.dialogRef.close(1);
              }
            });
          },
          error: (error) => {
            if (error.status == 400 || error.status == 503) {
              Swal.fire({
                icon: 'error',
                title: 'Carreras Técnicas',
                text: `No fue posible actualizar la información, valide `,
                footer: '<a href="">Kalum-app v1.0.0</a>',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(3);
                }
              });
            }
          },
          complete: () => console.log('Proceso finalizado'),
        });
    } else {
      // alert(JSON.stringify(data));
      this.carreraTecnicaService.addCarreraTecnica(dataForm).subscribe({
        next: (response: any) => {
          // alert(JSON.stringify(response));
          Swal.fire({
            icon: 'success',
            title: 'Carreras Técnicas',
            text: `Se agrego correctamente la carrera: ${response.nombre}.`,
            footer: '<a href="">Kalum-app v1.0.0</a>',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialogRef.close(1);
              // console.log(response);
            }
          });
        },
        error: (response) => {
          if (response.error.httpStatusCode) {
            if (
              response.error.httpStatusCode == 503 ||
              response.error.httpStatusCode == 500
            ) {
              Swal.fire({
                icon: 'error',
                title: 'Carreras Técnicas',
                text: `¡Error al consumir el servicio legado de la base de datos, contacte al administrador del sistema!`,
                footer: '<a href="">Kalum-app v1.0.0</a>',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.dialogRef.close(3);
                }
              });
            }
          }
        },
      });
    }
  }


  // para cancelar form
  onCancel() {
    this.dialogRef.close(3);
  }
}


