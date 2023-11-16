import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamenesAdmisionService } from 'src/app/modules/shared/services/examenes-admision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-examen-admision',
  templateUrl: './form-examen-admision.component.html',
  styles: [],
})
export class FormExamenAdmisionComponent implements OnInit {
  // formulario para examenes admision
  public examenesAdmisionFormGroup: FormGroup;

  ngOnInit(): void {}

  constructor(
    private formBuilder: FormBuilder,
    private examenesAdmisionService: ExamenesAdmisionService,
    private dialogRef: MatDialogRef<FormExamenAdmisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.examenesAdmisionFormGroup = this.formBuilder.group({
      fechaExamen: [data != null ? data.fechaExamen : '', Validators.required],
    });
  }

  onSave() {
    let dataForm = {
      fechaExamen: this.examenesAdmisionFormGroup.get('fechaExamen')?.value,
    };

    if (this.data != null) {
      this.examenesAdmisionService
        .updateExamenAdmision({
          examenId: this.data.examenId,
          fechaExamen: dataForm.fechaExamen,
        })
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Examenes Admisión',
              text: `Se actualizo correctamente el examen de Admision a: ${dataForm.fechaExamen}.`,
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
                title: 'Examenes Admisión',
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
      this.examenesAdmisionService.addExamenAdmision(dataForm).subscribe({
        next: (response: any) => {
          // alert(JSON.stringify(response));
          Swal.fire({
            icon: 'success',
            title: 'Examenes Admisión',
            text: `Se agrego correctamente el examen de Admisión: ${response.fechaExamen}.`,
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
                title: 'Examenes Admisión',
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

  onCancel() {
    this.dialogRef.close(3);
  }
}
